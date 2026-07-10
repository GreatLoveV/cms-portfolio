import express from "express";
import type { Response, Request } from "express";
import Project from "../models/project.ts";
import type { ApiError, ProjectEntry, NewProjectEntry } from "../types.ts";
import { newProjectParser } from "../middleware.ts";
const router = express.Router();

router.get("/", async (_req, res: Response<ProjectEntry[] | ApiError>) => {
  try {
    const projects = await Project.find({});
    res.status(200).json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "failed to fetch projects" });
  }
});

router.get(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<ProjectEntry | ApiError>,
  ) => {
    try {
      const project = await Project.findById(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json(project);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "failed to fetch project" });
    }
  },
);

router.post(
  "/",
  newProjectParser,
  async (
    req: Request<unknown, unknown, NewProjectEntry>,
    res: Response<ProjectEntry | ApiError>,
  ) => {
    try {
      const newProject = new Project(req.body);
      const savedProject = await newProject.save();
      res.status(201).json(savedProject);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "failed to create a new project" });
    }
  },
);

router.put(
  "/:id",
  newProjectParser,
  async (
    req: Request<{ id: string }, unknown, NewProjectEntry>,
    res: Response<ProjectEntry | ApiError>,
  ) => {
    try {
      const updatedProject = await Project.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true },
      );
      if (!updatedProject) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json(updatedProject);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "failed to update project" });
    }
  },
);

router.delete(
  "/:id",
  async (
    req: Request<{ id: string }, unknown, unknown>,
    res: Response<ProjectEntry | ApiError>,
  ) => {
    try {
      const project = await Project.findByIdAndDelete(req.params.id);
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      return res.status(200).json(project);
    } catch {
      return res.status(500).json({ error: "Failed to delete project" });
    }
  },
);

export default router;
