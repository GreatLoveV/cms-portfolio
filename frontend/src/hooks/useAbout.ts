import { useQuery } from "@tanstack/react-query";
import aboutService from "../services/aboutService";
import type { AboutEntry } from "../types";

export const useGetAbout = () => {
  return useQuery<AboutEntry>({
    queryKey: ["about"],
    queryFn: aboutService.getAbout,
  });
};
