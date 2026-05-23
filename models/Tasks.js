const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: String,
  status: { type: String, default: "not done" },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;