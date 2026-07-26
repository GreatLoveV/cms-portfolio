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
