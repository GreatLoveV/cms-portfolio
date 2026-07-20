import axios from "axios";
const baseUrl = "/api/about";
import { type AboutEntry, type NewAboutEntry } from "../types";

const getAbout = async (): Promise<AboutEntry> => {
  const response = await axios.get<AboutEntry>(baseUrl);
  return response.data;
};

const update = async (newAbout: NewAboutEntry): Promise<AboutEntry> => {
  const response = await axios.put<AboutEntry>(baseUrl, newAbout);
  return response.data;
};

export default { getAbout, update };
