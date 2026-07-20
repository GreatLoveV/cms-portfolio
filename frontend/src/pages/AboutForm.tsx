import useField from "../hooks/useField";
import { useState, type ChangeEvent, type FormEvent } from "react";
import type { NewAboutEntry, AboutEntry } from "../types";
import { useUpdateAbout } from "../hooks/useAbout";

interface Skill {
  name: string;
  category: string;
}

interface SocialLink {
  platform: string;
  url: string;
}

interface AboutFormProps {
  about: AboutEntry;
  onSuccess?: () => void;
}

const AboutForm = ({ about, onSuccess }: AboutFormProps) => {
  const { inputProps: name } = useField("text", about.name);
  const { inputProps: title } = useField("text", about.title);
  const { inputProps: shortBio } = useField("text", about.shortBio);
  const { inputProps: longBio } = useField("text", about.longBio);
  const { inputProps: profileImage } = useField(
    "url",
    about.profileImage ?? "",
  );
  const { inputProps: resumeUrl } = useField("url", about.resumeUrl ?? "");
  const { inputProps: location } = useField("text", about.location ?? "");

  const [availableForWork, setAvailableForWork] = useState(
    about.availableForWork,
  );

  const [skills, setSkills] = useState<Skill[]>(about.skills);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(
    about.socialLinks,
  );

  const updateMutation = useUpdateAbout();

  const updateSkill = (index: number, field: keyof Skill, value: string) => {
    setSkills((prev) =>
      prev.map((skill, i) =>
        i === index ? { ...skill, [field]: value } : skill,
      ),
    );
  };

  const addSkill = () => {
    setSkills((prev) => [...prev, { name: "", category: "" }]);
  };

  const removeSkill = (index: number) => {
    setSkills((prev) => prev.filter((_, i) => i !== index));
  };

  const updateSocialLink = (
    index: number,
    field: keyof SocialLink,
    value: string,
  ) => {
    setSocialLinks((prev) =>
      prev.map((link, i) => (i === index ? { ...link, [field]: value } : link)),
    );
  };

  const addSocialLink = () => {
    setSocialLinks((prev) => [...prev, { platform: "", url: "" }]);
  };

  const removeSocialLink = (index: number) => {
    setSocialLinks((prev) => prev.filter((_, i) => i !== index));
  };

  const handleAvailableChange = (e: ChangeEvent<HTMLInputElement>) => {
    setAvailableForWork(e.target.checked);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const updatedAbout: NewAboutEntry = {
      name: name.value,
      title: title.value,
      shortBio: shortBio.value,
      longBio: longBio.value,
      profileImage: profileImage.value || undefined,
      resumeUrl: resumeUrl.value || undefined,
      location: location.value || undefined,
      availableForWork,
      skills: skills.filter((s) => s.name.trim() !== ""),
      socialLinks: socialLinks.filter((l) => l.platform.trim() !== ""),
    };

    updateMutation.mutate(updatedAbout, {
      onSuccess: () => onSuccess?.(),
    });
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 max-w-lg mx-auto p-6 bg-neutral-900 border border-white/10 rounded-lg max-h-[80vh] overflow-y-auto"
    >
      <h2 className="text-lg font-medium text-white">Edit about</h2>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Name
        <input
          {...name}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Title
        <input
          {...title}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Short bio
        <input
          {...shortBio}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Long bio
        <textarea
          value={longBio.value}
          onChange={longBio.onChange}
          rows={4}
          required
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white resize-none"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Profile image URL
        <input
          {...profileImage}
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Resume URL
        <input
          {...resumeUrl}
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Location
        <input
          {...location}
          className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white"
        />
      </label>

      <label className="flex items-center gap-2 text-sm text-neutral-400">
        <input
          type="checkbox"
          checked={availableForWork}
          onChange={handleAvailableChange}
        />
        Available for work
      </label>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-neutral-400">Skills</span>
        {skills.map((skill, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={skill.name}
              onChange={(e) => updateSkill(index, "name", e.target.value)}
              placeholder="Name"
              className="flex-1 bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
            />
            <input
              value={skill.category}
              onChange={(e) => updateSkill(index, "category", e.target.value)}
              placeholder="Category"
              className="flex-1 bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
            />
            <button
              type="button"
              onClick={() => removeSkill(index)}
              className="text-neutral-400 hover:text-red-400 px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSkill}
          className="text-sm text-teal-400 hover:text-teal-300 self-start"
        >
          + Add skill
        </button>
      </div>

      <div className="flex flex-col gap-2">
        <span className="text-sm text-neutral-400">Social links</span>
        {socialLinks.map((link, index) => (
          <div key={index} className="flex gap-2">
            <input
              value={link.platform}
              onChange={(e) =>
                updateSocialLink(index, "platform", e.target.value)
              }
              placeholder="Platform"
              className="flex-1 bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
            />
            <input
              value={link.url}
              onChange={(e) => updateSocialLink(index, "url", e.target.value)}
              placeholder="URL"
              className="flex-1 bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white text-sm"
            />
            <button
              type="button"
              onClick={() => removeSocialLink(index)}
              className="text-neutral-400 hover:text-red-400 px-2"
            >
              ✕
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addSocialLink}
          className="text-sm text-teal-400 hover:text-teal-300 self-start"
        >
          + Add link
        </button>
      </div>

      <button
        type="submit"
        disabled={updateMutation.isPending}
        className="mt-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-neutral-950 font-medium rounded-md px-4 py-2 transition-colors"
      >
        {updateMutation.isPending ? "Saving..." : "Save changes"}
      </button>

      {updateMutation.isError && (
        <p className="text-red-400 text-sm">
          {(updateMutation.error as Error).message}
        </p>
      )}
    </form>
  );
};

export default AboutForm;
