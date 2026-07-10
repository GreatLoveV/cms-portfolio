import axios from "axios";
const baseUrl = "/api/about";
import { type AboutEntry } from "../types";

const getAbout = async (): Promise<AboutEntry> => {
  const response = await axios.get<AboutEntry>(baseUrl);
  return response.data;
};

export default { getAbout };
