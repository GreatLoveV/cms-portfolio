import { useState, type ChangeEvent, type FormEvent } from "react";
import useField from "../hooks/useField";
import { useCreateContact } from "../hooks/useContact";
import { SUBJECTS, type SubjectValue, type NewContactEntry } from "../types";
const ContactForm = () => {
  const {
    inputProps: name,
    reset: resetName
  } = useField("text", "");
  const {
    inputProps: email,
    reset: resetEmail
  } = useField("email", "");
  const {
    inputProps: message,
    reset: resetMessage
  } = useField("text", "");
  const {
    inputProps: honeypot,
    reset: resetHoneypot
  } = useField("text", "");
  const [subject, setSubject] = useState<SubjectValue>(SUBJECTS.FREELANCE);
  const [submitted, setSubmitted] = useState(false);
  const mutation = useCreateContact();
  const handleSubjectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSubject(e.target.value as SubjectValue);
  };
  const resetAll = () => {
    resetName();
    resetEmail();
    resetMessage();
    resetHoneypot();
    setSubject(SUBJECTS.FREELANCE);
  };
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newContact: NewContactEntry = {
      name: name.value,
      email: email.value,
      subject,
      message: message.value,
      honeypot: honeypot.value
    };
    mutation.mutate(newContact, {
      onSuccess: () => {
        resetAll();
        setSubmitted(true);
      }
    });
  };
  if (submitted) {
    return <div className="max-w-lg mx-auto px-6 py-12 text-center">
        <p className="text-teal-300">
          Thanks for reaching out — I'll get back to you soon.
        </p>
        <button onClick={() => setSubmitted(false)} className="mt-4 text-sm text-neutral-400 hover:text-white underline underline-offset-2">
          Send another message
        </button>
      </div>;
  }
  return <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-lg mx-auto px-6 py-12">
      <h2 className="text-lg font-medium text-white">Get in touch</h2>

      <input {...honeypot} name="website" autoComplete="off" tabIndex={-1} aria-hidden="true" style={{
      position: "absolute",
      left: "-9999px",
      width: "1px",
      height: "1px",
      opacity: 0
    }} />

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Name
        <input {...name} required minLength={2} maxLength={50} className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white" />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Email
        <input {...email} required className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white" />
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Subject
        <select value={subject} onChange={handleSubjectChange} className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white">
          {Object.values(SUBJECTS).map(value => <option key={value} value={value}>
              {value}
            </option>)}
        </select>
      </label>

      <label className="flex flex-col gap-1 text-sm text-neutral-400">
        Message
        <textarea value={message.value} onChange={message.onChange} rows={5} required minLength={20} maxLength={2000} className="bg-neutral-950 border border-white/10 rounded-md px-3 py-2 text-white resize-none" />
      </label>

      <button type="submit" disabled={mutation.isPending} className="mt-2 bg-teal-500 hover:bg-teal-400 disabled:opacity-50 text-neutral-950 font-medium rounded-md px-4 py-2 transition-colors">
        {mutation.isPending ? "Sending..." : "Send message"}
      </button>

      {mutation.isError && <p className="text-red-400 text-sm">
          Something went wrong. Please try again.
        </p>}
    </form>;
};
export default ContactForm;
