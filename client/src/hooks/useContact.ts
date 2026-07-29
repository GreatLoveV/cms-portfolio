import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import type { NewContactEntry, ContactEntry } from "../types";
import contactService from "../services/contactService";

export const useGetContacts = () => {
  return useQuery<ContactEntry[]>({
    queryKey: ["contacts"],
    queryFn: contactService.getAll,
  });
};

export const useCreateContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (newProject: NewContactEntry) =>
      contactService.create(newProject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => contactService.remove(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
  });
};
