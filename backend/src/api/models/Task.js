const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const TaskSchema = new Schema(
  {
    name: { type: String, required: true },
    createdAt: { type: Date },
    finished: { type: Boolean, default: false },
    finishedAt: { type: Date },
    projectId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "Project",
    },
  },
  { collection: "task" }
);

const Task = mongoose.model("Task", TaskSchema);

module.exports = Task;
