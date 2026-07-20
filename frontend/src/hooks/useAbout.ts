import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import aboutService from "../services/aboutService";
import type { AboutEntry, NewAboutEntry } from "../types";

export const useGetAbout = () => {
  return useQuery<AboutEntry>({
    queryKey: ["about"],
    queryFn: aboutService.getAbout,
  });
};

export const useUpdateAbout = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (about: NewAboutEntry) => aboutService.update(about),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["about"] });
    },
  });
};
