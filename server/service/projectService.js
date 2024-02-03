const { ProjectModel, UserModel, TaskModel } = require("../models");

const getProjects = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.role) throw "Role is required";

  const { userId, role, createdBy } = payload;

  if (role === "ADMIN") {
    return await getAdminProjets(userId);
  } else if (role === "USER") {
    // if user, we can show projects created by user
    return await getAdminProjets(createdBy);
  } else {
    return [];
  }
};

const getAdminProjets = async (adminId) => {
  return await ProjectModel.find({ createdBy: adminId }).populate({
    path: "createdBy",
    select: "_id name role",
  });
};

const addProject = async (payload) => {
  console.log(payload, "from serveri");
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.name) throw "Project name is required";

  const { userId, name, description } = payload;

  //   check if project already exists by name
  let project = await getProjectByIdAndName(userId, name);

  if (project) throw "You have already created project with this name";

  project = new ProjectModel({
    createdBy: userId,
    name,
    description: description || "",
  });

  return await project.save();
};

const updateProject = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.projectId) throw "Project id is required";
  if (!payload || !payload.name) throw "Name is required";

  const { userId, projectId, name, description } = payload;

  //   check if project already exists by name
  let project = await getProjectById({ projectId });

  if (!project) throw "Project does not exists";

  project.name = name || project.name;
  project.description = description || project.description;

  return await project.save();
};

const deleteProject = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.projectId) throw "Project id is required";

  const { userId, projectId } = payload;

  //   check if project already exists by name
  let project = await getProjectById({ projectId });

  if (!project) throw "Project does not exists";

  //   once project is delete, delete task as well
  const projectRes = await ProjectModel.deleteOne({ _id: projectId });
  const taskRes = await TaskModel.deleteMany({ project: projectId });

  return {
    projectCount: projectRes?.deletedCount,
    tasksCount: taskRes?.deletedCount,
  };
};

const getProjectByIdAndName = async (userId, name) => {
  return await ProjectModel.findOne({ createdBy: userId, name });
};

const getMembers = async (payload) => {
  if (!payload || !payload.userId) throw "User is required";

  const { userId, role, createdBy } = payload;
  if (role && role === "ADMIN") {
    return await UserModel.find({
      $or: [{ createdBy: userId }, { _id: userId }],
    });
  } else {
    return await UserModel.find({
      $or: [{ createdBy: createdBy }, { _id: userId }, { _id: createdBy }],
    });
  }
};

const getTasks = async (payload) => {
  if (!payload || !payload.userId) throw "User id is required";
  if (!payload || !payload.projectId) throw "Project id is required";

  const { userId, projectId } = payload;

  const tasks = await TaskModel.find({ project: projectId })
    .populate({
      path: "project",
      select: "_id name",
    })
    .populate({
      path: "createdBy",
      select: "_id name",
    })
    .populate({
      path: "assignees",
      select: "_id name role",
    });

  return tasks;
};

const addTask = async (payload) => {
  console.log(payload, "pay");
  if (!payload || !payload.createdBy) throw "Created by is required";
  if (!payload || !payload.projectId) throw "Project id is required";
  if (!payload || !payload.title) throw "Title is required";

  const {
    createdBy,
    projectId,
    title,
    description,
    assignees,
    priority,
    tags,
    deadline,
    status,
  } = payload;

  const task = new TaskModel({
    createdBy,
    project: projectId,
    title,
    description: description || "",
    assignees: assignees && assignees.length ? assignees : [],
    priority: priority || "LOW",
    tags: tags && tags.length ? tags : [],
    deadline: deadline || "",
    status: status || "PENDING",
  });

  return await task.save();
};

const updateTask = async (payload) => {
  if (!payload || !payload.taskId) throw "Task id is required";
  if (!payload || !payload.title) throw "Title is required";

  const {
    taskId,
    title,
    description,
    assignees,
    priority,
    tags,
    deadline,
    status,
  } = payload;

  //   check if task exists or not
  let task = await getTaskById(taskId);
  console.log(task, "from task");
  if (!task) throw "Task does not exists";

  //   udpate
  task.title = title || task.title;
  task.description = description || task.description;
  task.assignees = assignees && assignees.length ? assignees : task.assignees;
  task.priority = priority || task.priority;
  task.tags = tags && tags.length ? tags : task.tags;
  task.deadline = deadline || task.deadline;
  task.status = status || task.status;

  task = await task.save();

  return task;
};

const getTaskById = async (taskId) => {
  return await TaskModel.findOne({ _id: taskId })
    .populate({
      path: "project",
      select: "_id name",
    })
    .populate({
      path: "createdBy",
      select: "_id name",
    })
    .populate({
      path: "assignees",
      select: "_id name role",
    });
};

const deleteTaskById = async (payload) => {
  if (!payload || !payload.taskId) throw "Task id is required";

  const { taskId } = payload;

  // task exist or not
  const task = await getTaskById(taskId);

  if (!task) throw "Task does not exists";

  // if exists, delete
  return await TaskModel.deleteOne({ _id: taskId });
};

const getProjectById = async (payload) => {
  if (!payload || !payload.projectId) throw "Project id is required";

  const { projectId } = payload;

  return await ProjectModel.findOne({ _id: projectId });
};

module.exports = {
  getProjects,
  getAdminProjets,
  addProject,
  getProjectByIdAndName,
  getMembers,
  addTask,
  updateTask,
  getTasks,
  getTaskById,
  deleteTaskById,
  updateProject,
  getProjectById,
  deleteProject,
};
