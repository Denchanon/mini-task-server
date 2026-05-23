const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((error) => {
    console.log(error);
  });

let tasks = [
  { id: 1, name: "learn react", status: "not done" },
  { id: 2, name: "learn node", status: "not done" },
  { id: 3, name: "learn express", status: "not done" },
]

const Task = require("./models/Tasks");


app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.json(tasks);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

// app.post("/tasks", (req, res) => {
//   const { name } = req.body; // Assuming the request body contains a "name" field
//   const newTask = { id: Date.now(), name, status: "not done" };
//   tasks.push(newTask);
//   res.status(201).json(newTask);
// });

// app.patch("/tasks/:id", (req, res) => {
//   const id = parseInt(req.params.id); //ดึงค่า id จาก URL
//   const task = tasks.find((task) => task.id === id);
//   if (!task) return res.status(404).json({ message: "Task not found" });
//   task.status = task.status === "done" ? "not done" : "done";
//   res.json(task);
// });

// app.delete("/tasks/:id", (req, res) => {
//   const id = parseInt(req.params.id);
//   tasks = tasks.filter((t) => t.id !== id);
//   res.json({ message: "Deleted" });
// });

app.post("/tasks", async (req, res) => {
  try {
    const newTask = await Task.create({
      name: req.body.name
    });

    res.json(newTask);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.delete("/tasks/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.patch("/tasks/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);

    task.status = task.status === "done" ? "not done" : "done";

    await task.save();

    res.json(task);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
