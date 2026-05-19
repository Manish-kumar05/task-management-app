const express = require("express");
const Task = require("../models/Task");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create task
router.post("/", protect, async (req, res) => {
  const { title, description, status } = req.body;

  const task = await Task.create({
    title,
    description,
    status,
    user: req.user._id,
  });

  res.status(201).json(task);
});

// Get user tasks
router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({ user: req.user._id });
  res.json(tasks);
});

// Update task
router.put("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  task.title = req.body.title || task.title;
  task.description = req.body.description || task.description;
  task.status = req.body.status || task.status;

  const updatedTask = await task.save();
  res.json(updatedTask);
});

// Delete task
router.delete("/:id", protect, async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    return res.status(404).json({ message: "Task not found" });
  }

  await task.deleteOne();
  res.json({ message: "Task deleted successfully" });
});

module.exports = router;