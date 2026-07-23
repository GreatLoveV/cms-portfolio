import axios from "axios";
const baseUrl = "/api/login";

export interface AuthResult {
  token: string;
  username: string;
}

const login = async (
  username: string,
  password: string,
): Promise<AuthResult> => {
  const response = await axios.post<AuthResult>(baseUrl, {
    username,
    password,
  });
  return response.data;
};

export default { login };
