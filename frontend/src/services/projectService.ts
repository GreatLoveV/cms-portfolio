import axios from "axios";
const baseUrl = "/api/projects";
import type { ProjectEntry, NewProjectEntry } from "../types";

const getAll = async (): Promise<ProjectEntry[]> => {
  const response = await axios.get<ProjectEntry[]>(baseUrl);
  return response.data;
};

const create = async (newProject: NewProjectEntry): Promise<ProjectEntry> => {
  const response = await axios.post<ProjectEntry>(baseUrl, newProject);
  return response.data;
};

const update = async (
  id: string,
  newProject: NewProjectEntry,
): Promise<ProjectEntry> => {
  const response = await axios.put<ProjectEntry>(
    `${baseUrl}/${id}`,
    newProject,
  );

  return response.data;
};

const remove = async (id: string) => {
  const response = await axios.delete(id);
  return response.data;
};

export default { getAll, create, update, remove };
