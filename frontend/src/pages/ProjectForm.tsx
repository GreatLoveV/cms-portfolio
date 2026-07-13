import useField from "../hooks/useField";
import { useState, type ChangeEvent, type FormEvent } from "react";
import { useCreateProject } from "../hooks/useProjects";
import type { NewProjectEntry } from "../types";

const ProjectForm = ({ onSuccess }: { onSuccess?: () => void }) => {
  const mutation = useCreateProject();

  const { inputProps: title, reset: resetTitle } = useField("text");
  const { inputProps: description, reset: resetDescription } = useField("text");
  const { inputProps: date, reset: resetDate } = useField("date");
  const { inputProps: technologies, reset: resetTechnologies } =
    useField("text");
  const { inputProps: liveUrl, reset: resetLiveUrl } = useField("url");
  const { inputProps: githubUrl, reset: resetGithubUrl } = useField("url");
  const { inputProps: image, reset: resetImage } = useField("url");

  const [featured, setFeatured] = useState(false);

  const handleFeaturedChange = (event: ChangeEvent<HTMLInputElement>) => {
    setFeatured(event.target.checked);
  };

  const resetAll = () => {
    resetTitle();
    resetDescription();
    resetDate();
    resetTechnologies();
    resetLiveUrl();
    resetGithubUrl();
    resetImage();
    setFeatured(false);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const newProject: NewProjectEntry = {
      title: title.value,
      description: description.value,
      date: date.value,
      technologies: technologies.value
        .split(",")
        .map((t) => t.trim())
        .filter((t) => t.length > 0),
      liveUrl: liveUrl.value || undefined,
      githubUrl: githubUrl.value || undefined,
      image: image.value || undefined,
      featured,
    };

    mutation.mutate(newProject, {
      onSuccess: () => {
        resetAll();
        onSuccess?.();
      },
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-neutral-900 border border-white/10 rounded-lg"
    >
      <h2 className="text-lg font-medium text-white">New project</h2>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Title
        <input
          {...title}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Description
        <input
          {...description}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Date
        <input
          {...date}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Technologies (comma-separated)
        <input
          {...technologies}
          placeholder="React, TypeScript, MongoDB"
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Live URL
        <input
          {...liveUrl}
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        GitHub URL
        <input
          {...githubUrl}
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Image URL
        <input
          {...image}
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-neutral-400">
        <input
          type="checkbox"
          checked={featured}
          onChange={handleFeaturedChange}
        />
        Featured
      </label>

      <button
        type="submit"
        disabled={mutation.isPending}
        className="mt-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-neutral-950 font-medium rounded-md px-4 py-2 transition-colors"
      >
        {mutation.isPending ? "Saving..." : "Create project"}
      </button>

      {mutation.isError && (
        <p className="text-red-400 text-sm">
          {(mutation.error as Error).message}
        </p>
      )}
    </form>
  );
};
export default ProjectForm;
