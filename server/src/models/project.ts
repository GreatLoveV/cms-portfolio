import { model, Schema, Document } from "mongoose";
import type { ProjectEntry } from "../types.ts";

interface IProject extends ProjectEntry, Document {}

const projectSchema = new Schema<IProject>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: String, required: true },
  technologies: { type: [String], default: [] },
  liveUrl: { type: String },
  githubUrl: { type: String },
  image: { type: String },
  featured: Boolean,
});

projectSchema.set("toJSON", {
  transform: (_doc, returnedObject) => {
    const obj = returnedObject as unknown as Record<string, unknown>;
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export default model<IProject>("Project", projectSchema);
