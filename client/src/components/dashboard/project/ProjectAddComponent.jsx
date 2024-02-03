import { Box, Button, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProjectAction,
  updateProjectAction,
} from "../../../actions/userAction";

const ProjectAddComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const addProject = async () => {
    try {
      await dispatch(addProjectAction({ name, description }));
    } catch (error) {
      console.log(error, "from add project component");
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
          label="Description"
          type="text"
          name="description"
          fullWidth
          margin="normal"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <Divider sx={{ margin: "2rem 0 1rem 0" }} />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          onClick={addProject}
        >
          Add
        </Button>
      </Box>
    </>
  );
};

export default ProjectAddComponent;
