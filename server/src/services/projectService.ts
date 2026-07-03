import Project from "../models/project.ts";
// const baseUrl = "localhost:3001/api/projects";

const getAll = () => {
  const projects = Project.find({});
  return projects;
};

export default { getAll };
