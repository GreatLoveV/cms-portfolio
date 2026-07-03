import mongoose from "mongoose";
import { type ProjectEntry } from "../types.ts";

const projectSchema = new mongoose.Schema<ProjectEntry>({
  title: {
    type: String,
    required: true,
    minLength: 3,
  },
  description: {
    type: String,
    required: true,
    minLength: 20,
  },
  date: {
    type: String,
    required: true,
  },
  technologies: {
    type: [
      {
        type: String,
        minLength: 2,
      },
    ],
    required: true,
    validate: {
      validator: (arr: string[]) => arr.length > 0,
      message: "At least one or more technologies required",
    },
  },
});

export default mongoose.model("Project", projectSchema);
