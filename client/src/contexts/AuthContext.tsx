import {
  createContext,
  useReducer,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

import authService from "../services/authService";
import persistentAuth from "../services/persistentAuth";
import tokenService from "../services/tokenService";

interface AuthState {
  token: string | null;
  username: string | null;
}

type AuthAction = { type: "LOGIN"; payload: AuthState } | { type: "LOGOUT" };

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case "LOGIN":
      return action.payload;
    case "LOGOUT":
      return { token: null, username: null };
    default:
      return state;
  }
};

interface AuthContextType extends AuthState {
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(authReducer, {
    token: null,
    username: null,
  });

  useEffect(() => {
    const saved = persistentAuth.getAuth();
    if (saved) {
      tokenService.setToken(saved.token);
      dispatch({ type: "LOGIN", payload: saved });
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    const result = await authService.login(username, password);
    persistentAuth.saveAuth(result);
    tokenService.setToken(result.token);
    dispatch({ type: "LOGIN", payload: result });
  }, []);

  const logout = useCallback(() => {
    persistentAuth.removeAuth();
    dispatch({ type: "LOGOUT" });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
