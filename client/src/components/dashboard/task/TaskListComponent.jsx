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
} from "../../../actions/userAction";
import NoDataFoundComponent from "../../helper/NoDataFoundComponent";

const TaskListComponent = () => {
  const dispatch = useDispatch();
  const [tasks, setTasks] = useState([]);
  const { projectId } = useParams();
  const tasksState = useSelector((state) => state.userReducer.tasks);
  const meState = useSelector((state) => state.userReducer.me);

  const getProjectTasks = async () => {
    try {
      await dispatch(getProjectTasksAction({ projectId }));
    } catch (error) {
      console.log(error, "from get project  tasks");
    }
  };

  const deleteTask = async (taskId) => {
    try {
      await dispatch(deleteTaskAction({ taskId, projectId }));
    } catch (error) {
      console.log(error, "from delete task");
    }
  };

  useEffect(() => {
    setTasks(tasksState);
  }, [tasksState]);

  useEffect(() => {
    getProjectTasks();
  }, [projectId]);

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
            Tasks
          </Typography>
          {meState?.role === "ADMIN" && (
            <Link to={`/project/${projectId}/task`}>
              <Button type="submit" variant="contained" color="primary">
                Add
              </Button>
            </Link>
          )}
        </Box>

        {/* Table */}
        {tasks && tasks.length ? (
          <Table sx={{ marginY: "2rem" }}>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Description</TableCell>
                <TableCell>Created On</TableCell>
                <TableCell>Created By</TableCell>
                <TableCell>Priority</TableCell>
                <TableCell>Assigned To</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task, index) => (
                <TableRow key={task._id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.description}</TableCell>
                  <TableCell>{task.createdAt}</TableCell>
                  <TableCell>{task.createdBy.name}</TableCell>
                  <TableCell>
                    <Chip label={task.priority} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    {task.assignees && task.assignees.length ? (
                      task.assignees.map((assignee, assigneeIds) => (
                        <Chip
                          key={assigneeIds}
                          label={assignee.name}
                          variant="outlined"
                        />
                      ))
                    ) : (
                      <Chip label="NA" variant="outlined" />
                    )}
                  </TableCell>
                  <TableCell>
                    <Chip label={task.status} variant="outlined" />
                  </TableCell>
                  <TableCell>
                    <Stack direction="row">
                      <Link to={`/project/${projectId}/task/${task._id}`}>
                        <IconButton aria-label="edit">
                          <EditIcon />
                        </IconButton>
                      </Link>

                      {meState?.role === "ADMIN" && (
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => deleteTask(task._id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </TableCell>
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

export default TaskListComponent;
