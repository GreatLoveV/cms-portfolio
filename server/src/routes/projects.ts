import express from "express";
import type { Response, Request } from "express";
import Project from "../models/project.ts";
import type { ApiError, ProjectEntry } from "../types.ts";

const router = express.Router();

router.get("/", async (_req, res) => {
  const projects = await Project.find({});
  res.status(200).json(projects);
});

router.get("/:id", async (req, res) => {
  const project = await Project.findById(req.params.id);
  res.status(200).json(project);
});

router.post(
  "/",
  async (
    req: Request<unknown, unknown, ProjectEntry>,
    res: Response<ProjectEntry | ApiError>,
  ) => {
    try {
      const project = req.body;

      const newProject = new Project({
        title: project.title,
        description: project.description,
        date: project.date,
        technologies: project.technologies,
      });

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
  async (
    req: Request<{ id: string }, unknown, ProjectEntry>,
    res: Response<ProjectEntry | ApiError>,
  ) => {
    try {
      const project = await Project.findById(req.params.id);
      const updateProject = req.body;
      if (!project) {
        return res.status(404).json({ error: "Project not found" });
      }
      project.title = updateProject.title;
      project.description = updateProject.description;
      project.date = updateProject.date;
      project.technologies = updateProject.technologies;

      const updatedProject = await project.save();
      return res.status(200).json(updatedProject);
    } catch (error) {
      console.log(error);
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
