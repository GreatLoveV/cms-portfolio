import axios from "axios";
const baseUrl = "/api/about";
import { type AboutEntry, type NewAboutEntry } from "../types";
import tService from "./tokenService";

const getAbout = async (): Promise<AboutEntry> => {
  const response = await axios.get<AboutEntry>(baseUrl);
  return response.data;
};

const update = async (newAbout: NewAboutEntry): Promise<AboutEntry> => {
  const config = {
    headers: { Authorization: tService.getToken() },
  };
  const response = await axios.put<AboutEntry>(baseUrl, newAbout, config);
  return response.data;
};

export default { getAbout, update };
