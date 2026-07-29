export interface NewProjectEntry {
  title: string;
  description: string;
  date: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}

export interface ProjectEntry extends NewProjectEntry {
  id: string;
}
export const SUBJECTS = {
  FREELANCE: "Freelance Project",
  FULLTIME: "Full-time Opportunity",
  COLLAB: "Collaboration",
  HELLO: "Just saying hi",
} as const;

export type SubjectValue = (typeof SUBJECTS)[keyof typeof SUBJECTS];
export interface NewContactEntry {
  name: string;
  email: string;
  subject: string;
  message: string;
  honeypot: string;
}

export interface ContactEntry extends NewContactEntry {
  id: string;
  createdAt: string;
}
export interface NewAboutEntry {
  name: string;
  title: string;
  shortBio: string;
  longBio: string;
  profileImage?: string;
  resumeUrl?: string;
  skills: { name: string; category: string }[];
  socialLinks: { platform: string; url: string }[];
  location?: string;
  availableForWork: boolean;
}

export interface AboutEntry extends NewAboutEntry {
  updatedAt: string;
}
