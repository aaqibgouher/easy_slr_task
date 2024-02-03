import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTaskAction,
  editTaskAction,
  getAssigneesAction,
  getTaskDetailAction,
} from "../../../actions/userAction";
import { useNavigate, useParams } from "react-router-dom";

const TaskEditComponent = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { projectId, taskId } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [priority, setPriority] = useState("LOW");
  const [tags, setTags] = useState("");
  const [deadline, setDeadline] = useState(undefined);
  const [status, setStatus] = useState("PENDING");
  const [assigneeLists, setAssigneeLists] = useState([]);
  const assigneesState = useSelector((state) => state.userReducer.assignees);
  const priorityState = useSelector((state) => state.userReducer.priorities);
  const statusState = useSelector((state) => state.userReducer.status);
  const taskState = useSelector((state) => state.userReducer.task);

  const getAssignees = async () => {
    try {
      await dispatch(getAssigneesAction());
    } catch (error) {
      console.log(error, "from get assignes");
    }
  };

  const getTaskDetail = async () => {
    try {
      await dispatch(getTaskDetailAction({ taskId }));
    } catch (error) {
      console.log(error, "from get task detail");
    }
  };

  const editTask = async () => {
    try {
      console.log(projectId, "project id");
      const res = await dispatch(
        editTaskAction({
          taskId,
          title,
          description,
          assignees,
          priority,
          tags: tags.split(","),
          deadline,
          status,
        })
      );

      if (!res || res.status !== 200) throw "Something wrong";

      // redirect to dashboard
      navigate(`/project/${projectId}`);
    } catch (error) {
      console.log(error, "from add task");
    }
  };

  useEffect(() => {
    getAssignees();
    getTaskDetail();
  }, []);

  useEffect(() => {
    if (assigneesState && assigneesState.length) {
      console.log(assigneesState, "from state");
      setAssigneeLists(assigneesState);
    }
  }, [assigneesState]);

  useEffect(() => {
    if (taskState) {
      // initialising values
      setTitle(taskState?.title);
      setDescription(taskState?.description);
      setAssignees(taskState?.assignees?.map((ass) => ass._id));
      setPriority(taskState?.priority);
      setTags(taskState?.tags.join(","));
      setDeadline(taskState?.deadline ? taskState?.deadline : "");
      setStatus(taskState?.status);
    }
  }, [taskState]);

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
            Edit Task
          </Typography>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            onClick={editTask}
          >
            Edit
          </Button>
        </Box>
        <Card sx={{ marginY: "2rem" }}>
          <CardContent>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                {/* Title */}
                <TextField
                  label="Title"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                {/* Description */}
                <TextField
                  label="Description"
                  multiline
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={6}>
                {/* Assignees */}
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="assignees-label">Assignees</InputLabel>
                  <Select
                    labelId="assignees-label"
                    label="Assignees"
                    multiple
                    value={assignees}
                    onChange={(e) => setAssignees(e.target.value)}
                  >
                    {assigneeLists && assigneeLists.length ? (
                      assigneeLists.map((assignee, assigneeIds) => (
                        <MenuItem key={assigneeIds} value={assignee?._id}>
                          {assignee.name}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No assingees</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                {/* Priority */}
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="priority-label">Priority</InputLabel>
                  <Select
                    labelId="priority-label"
                    label="Priority"
                    value={priority}
                    onChange={(e) => setPriority(e.target.value)}
                  >
                    {priorityState && priorityState.length ? (
                      priorityState.map((prio, prioIds) => (
                        <MenuItem key={prioIds} value={prio?.value}>
                          {prio?.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No data</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>

              <Grid item xs={6}>
                {/* Tags */}
                <TextField
                  label="Tags"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  helperText="Enter tags separated by commas"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                {/* Deadline */}
                <TextField
                  label="Deadline"
                  type="datetime-local"
                  fullWidth
                  margin="normal"
                  variant="outlined"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={deadline ? deadline.split(".")[0] : ""}
                  onChange={(e) => setDeadline(e.target.value)}
                />
              </Grid>

              <Grid item xs={6}>
                <FormControl fullWidth margin="normal" variant="outlined">
                  <InputLabel id="status-label">Status</InputLabel>
                  <Select
                    labelId="status-label"
                    label="Status"
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                  >
                    {statusState && statusState.length ? (
                      statusState.map((sta, staIds) => (
                        <MenuItem key={staIds} value={sta.value}>
                          {sta.label}
                        </MenuItem>
                      ))
                    ) : (
                      <MenuItem value="">No data</MenuItem>
                    )}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Box>
    </>
  );
};

export default TaskEditComponent;
