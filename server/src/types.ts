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

export const projectSchema = newProjectSchema.extend({
  id: z.string(),
});
export type ProjectEntry = z.infer<typeof projectSchema>;

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
export const aboutSchema = newAboutSchema.extend({
  updatedAt: z.date(),
});
export type AboutEntry = z.infer<typeof aboutSchema>;

export const SUBJECTS = {
  FREELANCE: "Freelance Project",
  FULLTIME: "Full-time Opportunity",
  COLLAB: "Collaboration",
  HELLO: "Just saying hi",
} as const;

export type SubjectKey = (typeof SUBJECTS)[keyof typeof SUBJECTS];

export const newContactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  subject: z.enum(Object.values(SUBJECTS) as [string, ...string[]]),
  message: z.string().min(20, "Give me a little more detail").max(2000),
  honeypot: z.literal(""),
});
export type NewContactEntry = z.infer<typeof newContactSchema>;

export const contactSchema = newContactSchema.extend({
  id: z.string(),
  createdAt: z.date(),
});
export type ContactEntry = z.infer<typeof contactSchema>;

export const newLoginSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});
export type LoginBody = z.infer<typeof newLoginSchema>;

export interface ApiError {
  error: string;
}
