import axios from "axios";
const baseUrl = "/api/projects";
import type { ProjectEntry, NewProjectEntry } from "../types";
import tService from "./tokenService";

const getAll = async (): Promise<ProjectEntry[]> => {
  const response = await axios.get<ProjectEntry[]>(baseUrl);
  return response.data;
};

const create = async (newProject: NewProjectEntry): Promise<ProjectEntry> => {
  const config = {
    headers: { Authorization: tService.getToken() },
  };
  const response = await axios.post<ProjectEntry>(baseUrl, newProject, config);
  return response.data;
};

const update = async (
  id: string,
  newProject: NewProjectEntry,
): Promise<ProjectEntry> => {
  const config = {
    headers: { Authorization: tService.getToken() },
  };
  const response = await axios.put<ProjectEntry>(
    `${baseUrl}/${id}`,
    newProject,
    config,
  );

  return response.data;
};

const remove = async (id: string) => {
  const config = {
    headers: { Authorization: tService.getToken() },
  };
  const response = await axios.delete(`${baseUrl}/${id}`, config);
  return response.data;
};

export default { getAll, create, update, remove };
