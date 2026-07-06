export interface ProjectEntry {
  id?: string;
  title: string;
  description: string;
  date: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  image?: string;
  featured: boolean;
}
export interface AboutEntry {
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
  updatedAt: Date;
}
export interface ApiError {
  error: string;
}
