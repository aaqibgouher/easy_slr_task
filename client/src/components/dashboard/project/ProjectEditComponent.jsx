import { Box, Button, Divider, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateProjectAction } from "../../../actions/userAction";

const ProjectEditComponent = () => {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const projectState = useSelector((state) => state.userReducer.project);

  const updateProject = async () => {
    try {
      await dispatch(
        updateProjectAction({ projectId: projectState?._id, name, description })
      );
    } catch (error) {
      console.log(error, "from update project");
    }
  };

  useEffect(() => {
    if (projectState) {
      setName(projectState?.name);
      setDescription(projectState?.description);
    }
  }, [projectState]);

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
          onClick={updateProject}
        >
          Update
        </Button>
      </Box>
    </>
  );
};

export default ProjectEditComponent;
