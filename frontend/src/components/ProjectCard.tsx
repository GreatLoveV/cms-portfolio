// components/ProjectCard.tsx
import { useAuth } from "../hooks/useAuth";
import type { ProjectEntry } from "../types";

interface ProjectCardProps {
  project: ProjectEntry;
  onEdit?: (project: ProjectEntry) => void;
}

const ProjectCard = ({ project, onEdit }: ProjectCardProps) => {
  const { token } = useAuth();
  return (
    <div className="bg-neutral-900 border border-white/10 rounded-lg p-6 flex flex-col gap-3 ">
      {project.image && (
        <img
          src={project.image}
          alt={project.title}
          className="w-full h-48  object-cover"
        />
      )}
      <div className="flex items-center justify-between">
        <h3 className="text-lg text-white font-medium">{project.title}</h3>
        {token && onEdit && (
          <button
            onClick={() => onEdit(project)}
            className="text-neutral-400 hover:text-white transition-colors"
            aria-label="Edit project"
          >
            ✎
          </button>
        )}
      </div>
      <p className="text-sm text-neutral-400 leading-relaxed">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-2 mt-1">
        {project.technologies.map((tech) => (
          <span
            key={tech}
            className="text-xs text-neutral-300  bg-white/5 border border-white/10 rounded-full px-3 py-1 "
          >
            {tech}
          </span>
        ))}
      </div>

      <div className="flex gap-4 mt-2">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-teal-400 hover:text-teal-300 underline underline-offset-2"
          >
            Live demo
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-neutral-400 hover:text-white underline underline-offset-2 "
          >
            GitHub
          </a>
        )}
      </div>
    </div>
  );
};

export default ProjectCard;
