import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  Button,
  Typography,
  Grid,
  Divider,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardActions,
  Box,
  Stack,
  Chip,
} from "@mui/material";
import ShowIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import NoDataFoundComponent from "../../helper/NoDataFoundComponent";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProjectAction,
  getProjectsAction,
} from "../../../actions/userAction";
import { GET_PROJECT, SET_DIALOG } from "../../../types";

const ProjectListComponent = () => {
  const dispatch = useDispatch();
  const projectState = useSelector((state) => state.userReducer.projects);
  const [projects, setProjects] = useState();
  const meState = useSelector((state) => state.userReducer.me);

  const getProjects = async () => {
    try {
      await dispatch(getProjectsAction());
    } catch (error) {
      console.log(error, "from get projects list component");
    }
  };

  const editProject = async (project) => {
    try {
      // setting data to state
      await dispatch({ type: GET_PROJECT, payload: project });

      // set dialog on
      await dispatch({
        type: SET_DIALOG,
        payload: { open: true, title: "Edit Project", type: "EDIT_PROJECT" },
      });
    } catch (error) {
      console.log(error, "from edit project");
    }
  };

  const deleteProject = async (project) => {
    try {
      await dispatch(deleteProjectAction({ projectId: project._id }));
    } catch (error) {
      console.log(error, "from delete project ");
    }
  };

  const addProject = async () => {
    // setting model true
    await dispatch({
      type: SET_DIALOG,
      payload: { open: true, title: "Add Project", type: "ADD_PROJECT" },
    });
  };

  useEffect(() => {
    getProjects();
  }, []);

  useEffect(() => {
    setProjects(projectState);
  }, [projectState]);

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
            Projects
          </Typography>
          {/* show add project only to admin */}
          {meState?.role === "ADMIN" && (
            <Button
              type="submit"
              variant="contained"
              color="primary"
              onClick={addProject}
            >
              Add
            </Button>
          )}
        </Box>
        <Grid container spacing={3} sx={{ marginY: "2rem" }}>
          {projects && projects.length ? (
            projects.map((project) => (
              <Grid item key={project._id} xs={12} sm={6} md={4} lg={3}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardMedia
                    sx={{ height: 140 }}
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSrwMUmX3Gjrf_OX3c1Avy4rx0nUPKj6aGjsCRgokD5CA051c67v9QQQjBpl3vmdr_39VA&usqp=CAU"
                    title="green iguana"
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {project.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {project.description}
                    </Typography>
                    <Chip
                      label={`Created By: ${project.createdBy.name}`}
                      variant="outlined"
                      sx={{ marginY: "1rem" }}
                    />
                  </CardContent>
                  <Divider />
                  <CardActions>
                    <Stack direction="row">
                      <Link to={`/project/${project._id}`}>
                        <IconButton aria-label="view">
                          <ShowIcon />
                        </IconButton>
                      </Link>

                      {meState?.role === "ADMIN" && (
                        <IconButton
                          aria-label="edit"
                          onClick={(e) => editProject(project)}
                        >
                          <EditIcon />
                        </IconButton>
                      )}

                      {meState?.role === "ADMIN" && (
                        <IconButton
                          aria-label="delete"
                          onClick={(e) => deleteProject(project)}
                        >
                          <DeleteIcon />
                        </IconButton>
                      )}
                    </Stack>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <NoDataFoundComponent />
          )}
        </Grid>
      </Box>
    </>
  );
};

export default ProjectListComponent;
