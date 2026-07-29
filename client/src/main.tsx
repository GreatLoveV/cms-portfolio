import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { MutationCache, QueryCache, QueryClient, QueryClientProvider } from "@tanstack/react-query";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import sessionService from "./services/sessionService.ts";
import App from "./App.tsx";
import "./index.css";

const handleUnauthorized = (error: unknown) => {
  if (!axios.isAxiosError(error) || error.response?.status !== 401) return;
  if (window.location.pathname === "/login") return;
  sessionService.clearSession();
  window.location.assign("/login");
};

const queryClient = new QueryClient({
  queryCache: new QueryCache({
    onError: handleUnauthorized,
  }),
  mutationCache: new MutationCache({
    onError: handleUnauthorized,
  }),
});

createRoot(document.getElementById("root")!).render(
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <Router>
        <App />
      </Router>
    </AuthProvider>
  </QueryClientProvider>,
);
