import {
  Box,
  Button,
  Chip,
  Divider,
  IconButton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import DoneIcon from "@mui/icons-material/Done";
import CloseIcon from "@mui/icons-material/Close";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteTaskAction,
  getProjectTasksAction,
  getUsersAction,
} from "../../../actions/userAction";
import NoDataFoundComponent from "../../helper/NoDataFoundComponent";
import { SET_DIALOG } from "../../../types";

const UserListComponent = () => {
  const dispatch = useDispatch();
  const [users, setUsers] = useState([]);
  const usersState = useSelector((state) => state.userReducer.users);

  const getUsers = async () => {
    try {
      await dispatch(getUsersAction());
    } catch (error) {
      console.log(error, "from get users user list");
    }
  };

  const addUser = async () => {
    try {
      // open dialog
      await dispatch({
        type: SET_DIALOG,
        payload: { open: true, title: "Add User", type: "ADD_USER" },
      });
    } catch (error) {
      console.log(error, "from error");
    }
  };

  useEffect(() => {
    setUsers(usersState);
  }, [usersState]);

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <>
      <Box>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h3" component="div">
            Users
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={addUser}
          >
            Add
          </Button>
        </Box>

        {/* Table */}
        {users && users.length ? (
          <Table sx={{ marginY: "2rem" }}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Created By</TableCell>
                {/* <TableCell>Actions</TableCell> */}
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((task, index) => (
                <TableRow key={task._id}>
                  <TableCell>{task.name}</TableCell>
                  <TableCell>{task.email}</TableCell>
                  <TableCell>
                    <Chip label={task.role} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Chip label={task.createdBy.name} variant="outlined" />
                  </TableCell>
                  {/* <TableCell>
                    <Stack direction="row">
                      <Link to={`/`}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>

                      <IconButton aria-label="delete">
                        <DeleteIcon />
                      </IconButton>
                    </Stack>
                  </TableCell> */}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ) : (
          <NoDataFoundComponent />
        )}
      </Box>
    </>
  );
};

export default UserListComponent;
