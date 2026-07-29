import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import pService from "../services/projectService";
import type { ProjectEntry, NewProjectEntry } from "../types";

export const useGetProjects = () => {
  return useQuery<ProjectEntry[]>({
    queryKey: ["projects"],
    queryFn: pService.getAll,
  });
};

export const useCreateProject = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: NewProjectEntry) => pService.create(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, project }: { id: string; project: NewProjectEntry }) =>
      pService.update(id, project),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => pService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
