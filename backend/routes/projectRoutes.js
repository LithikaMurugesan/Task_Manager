import express from "express";
import Project from "../models/Project.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.get("/", protect, async (req, res) => {
  const projects = await Project.find();
  res.json(projects);
});


router.post("/", protect, async (req, res) => {

  if (req.user.role !== "admin") {
    return res.status(403).json({ msg: "Only admin can create project" });
  }

  const project = await Project.create({
    name: req.body.name,
    members: req.body.members || [],
    createdBy: req.user.id
  });

  res.json(project);
});

router.get("/", protect, async (req, res) => {
  const projects = await Project.find({
    $or: [
      { createdBy: req.user.id },
      { members: req.user.email }
    ]
  });

  res.json(projects);
});

export default router;
