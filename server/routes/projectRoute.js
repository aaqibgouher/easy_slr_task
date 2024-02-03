const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const { isAdmin } = require("../middleware/adminMiddleware");

// get projects
router.get("/", projectController.getProjects);

// create project
router.post("/", isAdmin, projectController.addProject);

// update project
router.put("/:projectId", isAdmin, projectController.updateProject);

// delete project
router.delete("/:projectId", isAdmin, projectController.deleteProject);

// get team members
router.get("/members", projectController.getMembers);

// create task under project
router.post("/task", isAdmin, projectController.addTask);

// get task under project
router.get("/:projectId/task", projectController.getTasks);

// get task by id
router.get("/task/:taskId", projectController.getTaskById);

// update task under project
router.put("/task/:taskId", projectController.updateTask);

// delete task under project
router.delete("/task/:taskId", isAdmin, projectController.deleteTaskById);

module.exports = router;
