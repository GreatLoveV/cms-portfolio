import { useQuery } from "@tanstack/react-query";
import pService from "../services/projectService";
import type { ProjectEntry } from "../types";

export const useGetProjects = () => {
  return useQuery<ProjectEntry[]>({
    queryKey: ["projects"],
    queryFn: pService.getAll,
  });
};
