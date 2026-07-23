import { useState } from "react";
import { useGetAbout } from "../hooks/useAbout";
import AboutForm from "./AboutForm";
import { useAuth } from "../hooks/useAuth";

const About = () => {
  const { isLoading, isError, error, data } = useGetAbout();
  const [showForm, setShowForm] = useState(false);
  const { token } = useAuth();
  const closeForm = () => {
    setShowForm(false);
  };
  if (isLoading)
    return <div className="text-neutral-400 p-6">is loading...</div>;
  if (isError)
    return <div className="text-red-400 p-6">Error: {error.message}</div>;

  const about = data ?? null;

  if (!about)
    return <div className="text-neutral-400 p-6">No about info yet.</div>;
  return (
    <div className="relative max-w-2xl mx-auto px-6 py-12 flex flex-col gap-8">
      {token && (
        <button
          className="absolute top-4 right-4 text-neutral-400 hover:text-white bg-white/5 rounded-full  w-8 h-8  flex items-center justify-center"
          aria-label="Edit about info"
          onClick={() => {
            setShowForm(true);
          }}
        >
          ✎
        </button>
      )}
      <div className="flex flex-col items-center text-center gap-4">
        {about.profileImage && (
          <img
            src={about.profileImage}
            alt={about.name}
            className="w-32 h-32 rounded-full object-cover border border-white/10 "
          />
        )}
        <div>
          <h2 className="text-2xl font-medium text-white">{about.name}</h2>
          <h3 className="text-base text-neutral-400">{about.title}</h3>
        </div>
        <span
          className={`text-xs px-3 py-1 rounded-full border 
            ${
              about.availableForWork
                ? "text-teal-300 bg-teal-400/10 border-teal-400/20"
                : "text-neutral-400 bg-white/5 border-white/10"
            }`}
        >
          {about.availableForWork ? "Available for work" : "Not available"}
        </span>
        {about.location && (
          <p className="text-sm text-neutral-500">Location: {about.location}</p>
        )}
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-neutral-300 leading-relaxed">{about.shortBio}</p>
        <p className="text-neutral-400 leading-relaxed">{about.longBio}</p>
      </div>
      {about.resumeUrl && (
        <a
          href={about.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="self-start text-sm text-teal-400 hover:text-teal-300 underline underline-offset-2"
        >
          My Resume
        </a>
      )}
      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium text-white">Skills</h4>
        <ul className="flex flex-wrap gap-2">
          {about.skills.map((skill) => {
            return (
              <li
                key={skill.name}
                className="text-xs text-neutral-300 bg-white/5 border border-white/10 rounded-full px-3 py-1"
              >
                {skill.name}
                <span className="text-neutral-500">({skill.category})</span>
              </li>
            );
          })}
        </ul>
      </div>

      <div className="flex flex-col gap-2">
        <h4 className="text-sm font-medium text-white">Links</h4>
        <ul className="flex gap-4">
          {about.socialLinks.map((link) => {
            return (
              <li key={link.platform}>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-neutral-400 hover:text-white underline underline-offset-2"
                >
                  {link.platform}
                </a>
              </li>
            );
          })}
        </ul>
      </div>

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

            <AboutForm about={about} onSuccess={closeForm} />
          </div>
        </div>
      )}
    </div>
  );
};

export default About;
