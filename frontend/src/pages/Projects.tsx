import { useGetProjects } from "../hooks/useProjects";
import ProjectCard from "../components/ProjectCard";

const Projects = () => {
  const { data, isLoading, isError, error } = useGetProjects();

  if (isLoading) return <p>Loading projects...</p>;
  if (isError) return <p>Error: {error.message}</p>;

  const projects = data ?? [];

  return (
    <div>
      <h1 className="font-medium text-lg p-3">Projects</h1>
      {projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))
      )}
    </div>
  );
};

export default Projects;
