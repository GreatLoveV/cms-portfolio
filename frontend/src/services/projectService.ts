import axios from "axios";
const baseUrl = "/api/projects";
import { type ProjectEntry } from "../types";

const getAll = async (): Promise<ProjectEntry[]> => {
  const response = await axios.get<ProjectEntry[]>(baseUrl);
  return response.data;
};

export default { getAll };
