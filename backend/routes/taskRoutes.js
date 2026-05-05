import express from "express";
import Task from "../models/Task.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", protect, async (req, res) => {
  const tasks = await Task.find({
    $or: [
      { assignedTo: req.user.email },
      { createdBy: req.user.id }
    ]
  });

  res.json(tasks);
});


router.post("/", protect, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admin can create task" });
  }

  const { title, assignedTo, projectId, deadline } = req.body;

  if (!title || !assignedTo) {
    return res.status(400).json({ msg: "Title and assigned user required" });
  }

  const task = await Task.create({
    title,
    assignedTo,
    projectId,
    deadline,
    createdBy: req.user.id
  });

  res.json(task);
});


router.put("/:id", protect, async (req, res) => {

  const task = await Task.findById(req.params.id);

  if (!task) return res.status(404).json({ msg: "Task not found" });

  if (
    req.user.role === "member" &&
    task.assignedTo !== req.user.email
  ) {
    return res.status(403).json({ msg: "Not your task" });
  }

  task.status = req.body.status;
  await task.save();

  res.json(task);
});

export default router;