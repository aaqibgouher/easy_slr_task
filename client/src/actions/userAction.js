import {
  addProjectApi,
  addTaskApi,
  addUserApi,
  deleteProjectApi,
  deleteTaskApi,
  editTaskApi,
  getAssigneesApi,
  getMeApi,
  getProjectTasksApi,
  getProjectsApi,
  getTaskDetailApi,
  getUsersApi,
  loginApi,
  logoutApi,
  registerApi,
  updateProfileApi,
  updateProjectApi,
} from "../api/userApi";
import {
  GET_ASSIGNEES,
  GET_ME,
  GET_PROJECTS,
  GET_TASK,
  GET_TASKS,
  GET_USERS,
  SET_DIALOG,
  SET_SNACKBAR,
  SET_TOKEN,
} from "../types";

export const registerAction = (payload) => async (dispatch) => {
  try {
    console.log(payload);
    const res = await registerApi(payload);

    console.log(res, "from register action res");
    if (!res || res.status !== 200) throw res.error;

    // show success message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "register action error");
    // show snackbar
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const loginAction = (payload) => async (dispatch) => {
  try {
    const res = await loginApi(payload);

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   set token to state & localstoray
    dispatch({ type: SET_TOKEN, payload: res.data.token });

    // save token to local storage
    localStorage.setItem("token", res.data.token);

    return res;
  } catch (error) {
    console.log(error, "from auth actions -> login user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const logoutAction = () => async (dispatch) => {
  try {
    const res = await logoutApi();

    if (!res || res.status !== 200) throw res.error;

    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   remove token from state
    dispatch({ type: SET_TOKEN, payload: null });

    // save token to local storage
    localStorage.removeItem("token");

    // setting me to null
    dispatch({ type: GET_ME, payload: null });

    return res;
  } catch (error) {
    console.log(error, "from logout user action");
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: error },
    });
  }
};

export const getMeAction = () => async (dispatch) => {
  try {
    const res = await getMeApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_ME, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getProjectsAction = () => async (dispatch) => {
  try {
    const res = await getProjectsApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // update me state
    dispatch({ type: GET_PROJECTS, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const updateProjectAction = (payload) => async (dispatch) => {
  try {
    const res = await updateProjectApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   close dialog
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });

    // refresh projects
    await dispatch(getProjectsAction());
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const deleteProjectAction = (payload) => async (dispatch) => {
  try {
    const res = await deleteProjectApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   close dialog
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });

    // refresh projects
    await dispatch(getProjectsAction());
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const addProjectAction = (payload) => async (dispatch) => {
  try {
    const res = await addProjectApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   close dialog
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });

    // refresh projects
    await dispatch(getProjectsAction());
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getProjectTasksAction = (payload) => async (dispatch) => {
  try {
    const res = await getProjectTasksApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    dispatch({ type: GET_TASKS, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getAssigneesAction = () => async (dispatch) => {
  try {
    const res = await getAssigneesApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    dispatch({ type: GET_ASSIGNEES, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const addTaskAction = (payload) => async (dispatch) => {
  try {
    const res = await addTaskApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const deleteTaskAction = (payload) => async (dispatch) => {
  try {
    const res = await deleteTaskApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh task list
    await dispatch(getProjectTasksAction(payload));
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getTaskDetailAction = (payload) => async (dispatch) => {
  try {
    const res = await getTaskDetailApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    dispatch({ type: GET_TASK, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const editTaskAction = (payload) => async (dispatch) => {
  try {
    const res = await editTaskApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    return res;
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const getUsersAction = () => async (dispatch) => {
  try {
    const res = await getUsersApi();

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    dispatch({ type: GET_USERS, payload: res.data });
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const addUserAction = (payload) => async (dispatch) => {
  try {
    const res = await addUserApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    //   close dialog
    await dispatch({
      type: SET_DIALOG,
      payload: null,
    });

    // refresh task list
    await dispatch(getUsersAction(payload));
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};

export const updateProfileAction = (payload) => async (dispatch) => {
  try {
    const res = await updateProfileApi(payload);

    if (!res || res.status !== 200) throw res.error;

    // show message
    dispatch({
      type: SET_SNACKBAR,
      payload: { open: true, message: res.message },
    });

    // refresh task list
    await dispatch(getMeAction());
  } catch (error) {
    console.log(error, "from get me action user action");
    dispatch({ type: SET_SNACKBAR, payload: { open: true, message: error } });
  }
};
