import axios from "axios";
const baseUrl = "/api/contact";
import type { ContactEntry, NewContactEntry } from "../types";
import tService from "./tokenService";

const getAll = async (): Promise<ContactEntry[]> => {
  const response = await axios.get<ContactEntry[]>(baseUrl, {
    headers: { Authorization: tService.getToken() },
  });
  return response.data;
};

const create = async (newContact: NewContactEntry): Promise<ContactEntry> => {
  const response = await axios.post<ContactEntry>(baseUrl, newContact);
  return response.data;
};

const remove = async (id: string) => {
  const response = await axios.delete(`${baseUrl}/${id}`, {
    headers: { Authorization: tService.getToken() },
  });
  return response.data;
};

export default { getAll, create, remove };
