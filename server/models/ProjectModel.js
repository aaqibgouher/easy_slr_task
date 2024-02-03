const mongoose = require("mongoose");

// project schema
const projectSchema = new mongoose.Schema(
  {
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "UserModel",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
  },
  { timestamps: true }
);

const ProjectModel = mongoose.model("ProjectModel", projectSchema, "projects");

module.exports = ProjectModel;
