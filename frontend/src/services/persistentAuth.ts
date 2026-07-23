import type { AuthResult } from "./authService";

const STORAGE_KEY = "auth";

const getAuth = (): AuthResult | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;

  try {
    return JSON.parse(saved) as AuthResult;
  } catch {
    return null;
  }
};

const saveAuth = (auth: AuthResult): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(auth));
};

const removeAuth = (): void => {
  localStorage.removeItem(STORAGE_KEY);
};

export default { getAuth, saveAuth, removeAuth };
