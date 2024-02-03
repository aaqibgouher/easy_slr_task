const projectService = require("../service/projectService");

const getProjects = async (req, res) => {
  try {
    const { _id, role, createdBy } = req.user;
    const data = await projectService.getProjects({
      userId: _id,
      role,
      createdBy,
    });

    return res.json({
      status: 200,
      message: "Successfully get projects",
      data,
    });
  } catch (error) {
    console.log(error, "from get users controller");
    return res.json({ status: 400, error });
  }
};

const addProject = async (req, res) => {
  try {
    const { _id } = req.user;
    const { name, description } = req.body;
    const data = await projectService.addProject({
      userId: _id,
      name,
      description,
    });

    return res.json({
      status: 200,
      message: "Successfully added project",
      data,
    });
  } catch (error) {
    console.log(error, "from add project controller");
    return res.json({ status: 400, error });
  }
};

const updateProject = async (req, res) => {
  try {
    const { _id } = req.user;
    const { projectId } = req.params;
    const { name, description } = req.body;
    const data = await projectService.updateProject({
      userId: _id,
      projectId,
      name,
      description,
    });

    return res.json({
      status: 200,
      message: "Successfully updated project",
      data,
    });
  } catch (error) {
    console.log(error, "from update project controller");
    return res.json({ status: 400, error });
  }
};

const deleteProject = async (req, res) => {
  try {
    const { _id } = req.user;
    const { projectId } = req.params;
    const data = await projectService.deleteProject({
      userId: _id,
      projectId,
    });

    return res.json({
      status: 200,
      message: "Successfully deleted a project",
      data,
    });
  } catch (error) {
    console.log(error, "from delete project controller");
    return res.json({ status: 400, error });
  }
};

const getMembers = async (req, res) => {
  try {
    const { _id, role, createdBy } = req.user;
    const data = await projectService.getMembers({
      userId: _id,
      role,
      createdBy,
    });

    return res.json({
      status: 200,
      message: "Successfully get project members",
      data,
    });
  } catch (error) {
    console.log(error, "from get project members controller");
    return res.json({ status: 400, error });
  }
};

const getTasks = async (req, res) => {
  try {
    const { _id } = req.user;
    const { projectId } = req.params;
    const data = await projectService.getTasks({ userId: _id, projectId });

    return res.json({
      status: 200,
      message: "Successfully get tasks",
      data,
    });
  } catch (error) {
    console.log(error, "from get tasks controller");
    return res.json({ status: 400, error });
  }
};

const getTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const data = await projectService.getTaskById(taskId);

    return res.json({
      status: 200,
      message: "Successfully get task by id",
      data,
    });
  } catch (error) {
    console.log(error, "from get task controller");
    return res.json({ status: 400, error });
  }
};

const deleteTaskById = async (req, res) => {
  try {
    const { taskId } = req.params;

    const data = await projectService.deleteTaskById({ taskId });

    return res.json({
      status: 200,
      message: "Successfully deleted a task by id",
      data,
    });
  } catch (error) {
    console.log(error, "from delete task controller");
    return res.json({ status: 400, error });
  }
};

const addTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const {
      projectId,
      title,
      description,
      assignees,
      priority,
      tags,
      deadline,
      status,
    } = req.body;
    const data = await projectService.addTask({
      createdBy: _id,
      projectId,
      title,
      description,
      assignees,
      priority,
      tags,
      deadline,
      status,
    });

    return res.json({
      status: 200,
      message: "Successfully added a task under project",
      data,
    });
  } catch (error) {
    console.log(error, "from add task under project controller");
    return res.json({ status: 400, error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { _id } = req.user;
    const { taskId } = req.params;
    const { title, description, assignees, priority, tags, deadline, status } =
      req.body;
    const data = await projectService.updateTask({
      createdBy: _id,
      taskId,
      title,
      description,
      assignees,
      priority,
      tags,
      deadline,
      status,
    });

    return res.json({
      status: 200,
      message: "Successfully updated a task under project",
      data,
    });
  } catch (error) {
    console.log(error, "from update task under project controller");
    return res.json({ status: 400, error });
  }
};

module.exports = {
  getProjects,
  addProject,
  getMembers,
  addTask,
  updateTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  updateProject,
  deleteProject,
};
