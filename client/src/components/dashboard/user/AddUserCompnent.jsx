import { Box, Button, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectAction,
  addUserAction,
  updateProjectAction,
} from "../../../actions/userAction";

const AddUserComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const addUser = async () => {
    try {
      await dispatch(addUserAction({ name, email }));
    } catch (error) {
      console.log(error, "from add user");
    }
  };

  return (
    <>
      <Box>
        <TextField
          label="Name"
          type="text"
          name="name"
          fullWidth
          margin="normal"
          variant="outlined"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          label="Email"
          type="text"
          name="email"
          fullWidth
          margin="normal"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Divider sx={{ margin: "2rem 0 1rem 0" }} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addUser}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default AddUserComponent;
