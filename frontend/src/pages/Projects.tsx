import { useGetProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";
import { useState } from "react";
import ProjectForm from "./ProjectForm";
import type { ProjectEntry } from "../types";
import { useAuth } from "../hooks/useAuth";

const Projects = () => {
  const { data, isLoading, isError, error } = useGetProjects();
  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState<ProjectEntry | null>(
    null,
  );
  const { token } = useAuth();
  const openCreateForm = () => {
    setEditingProject(null);
    setShowForm(true);
  };

  const openEditForm = (project: ProjectEntry) => {
    setEditingProject(project);
    setShowForm(true);
  };
  const closeForm = () => {
    setEditingProject(null);
    setShowForm(false);
  };
  if (isLoading) return <p>Loading projects...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const projects = data ?? [];

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <h1 className=" text-2xl font-medium text-white">Projects</h1>
        {token && (
          <button
            onClick={openCreateForm}
            className="bg-teal-500 hover:bg-teal-400 text-neutral-950 font-medium rounded-md px-4 py-2 transition-colors"
          >
            New Project
          </button>
        )}
      </div>

      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <ProjectCard
            key={project.id}
            onEdit={openEditForm}
            project={project}
          />
        ))
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-20 p-6">
          <div className="relative w-full max-w-lg">
            <button
              onClick={closeForm}
              className="absolute -top-3 -right-3 bg-neutral-800 text-white  rounded-full w-8 h-8 flex items-center justify-center hover:bg-neutral-700"
              aria-label="close"
            >
              ✕
            </button>

            <ProjectForm
              project={editingProject ?? undefined}
              onSuccess={closeForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;
