import { z } from "zod";

export const newProjectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  technologies: z.array(z.string()),
  liveUrl: z.url().optional(),
  githubUrl: z.url().optional(),
  image: z.string().optional(),
  featured: z.boolean(),
});

export type NewProjectEntry = z.infer<typeof newProjectSchema>;

export interface ProjectEntry extends NewProjectEntry {
  id: string;
}

export const newAboutSchema = z.object({
  name: z.string().min(1),
  title: z.string().min(1),
  shortBio: z.string().min(1),
  longBio: z.string().min(1),
  profileImage: z.string().optional(),
  resumeUrl: z.string().optional(),
  skills: z.array(
    z.object({ name: z.string().min(1), category: z.string().min(1) }),
  ),
  socialLinks: z.array(z.object({ platform: z.string().min(1), url: z.url() })),
  location: z.string().optional(),
  availableForWork: z.boolean(),
});

export type NewAboutEntry = z.infer<typeof newAboutSchema>;

export interface AboutEntry extends NewAboutEntry {
  updatedAt: Date;
}
export interface ApiError {
  error: string;
}
