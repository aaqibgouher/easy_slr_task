const mongoose = require("mongoose");

// task schema
const taskSchema = new mongoose.Schema(
  {
    project: {
      type: mongoose.Types.ObjectId,
      ref: "ProjectModel",
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    assignees: {
      type: [
        {
          type: mongoose.Types.ObjectId,
          ref: "UserModel",
        },
      ],
      default: [],
    },
    priority: {
      type: String,
      enum: ["HIGH", "MEDIUM", "LOW"],
      default: "LOW",
    },
    tags: {
      type: [String],
      default: [],
    },
    deadline: {
      type: Date,
      default: "",
    },
    status: {
      type: String,
      enum: ["PENDING", "IN_PROGRESS", "DONE"],
      default: "PENDING",
    },
  },
  { timestamps: true }
);

const TaskModel = mongoose.model("TaskModel", taskSchema, "tasks");

module.exports = TaskModel;
