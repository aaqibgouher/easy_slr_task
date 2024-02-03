import axios from "axios";

const apiService = axios.create({
  baseURL: "http://localhost:3001/api",
});

export const registerApi = async (payload) => {
  try {
    const res = await apiService.post("/auth/register", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from register api");
    throw error.response;
  }
};

export const loginApi = async (payload) => {
  try {
    const res = await apiService.post("/auth/login", payload);
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from login api");
    throw error.response;
  }
};

export const logoutApi = async () => {
  try {
    const res = await apiService.get("/auth/logout", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from logout api");
    throw error.response;
  }
};

export const getMeApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/auth/me", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getProjectsApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get("/project", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const updateProjectApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.put(`/project/${payload.projectId}`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const deleteProjectApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.delete(`/project/${payload.projectId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const addProjectApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.post("/project", payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getProjectTasksApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/project/${payload.projectId}/task`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getAssigneesApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/project/members`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const addTaskApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.post(`/project/task`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const deleteTaskApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.delete(`/project/task/${payload.taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getTaskDetailApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/project/task/${payload.taskId}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const editTaskApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.put(
      `/project/task/${payload.taskId}`,
      payload,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }
    );
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const getUsersApi = async () => {
  try {
    console.log("from get me api");
    const res = await apiService.get(`/user`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const addUserApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.post(`/user`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};

export const updateProfileApi = async (payload) => {
  try {
    console.log("from get me api");
    const res = await apiService.put(`/auth/profile`, payload, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    console.log(res, "from res");

    if (res.hasOwnProperty("status") && res.status !== 200)
      throw "Error while calling api";

    return res.data;
  } catch (error) {
    console.log(error.response, "from fetch me api");
    throw error.response;
  }
};
