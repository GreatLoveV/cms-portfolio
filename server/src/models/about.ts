import { model, Schema, Document } from "mongoose";
import type { AboutEntry } from "../types.ts";

interface ISkill {
  name: string;
  category: string;
}

interface ISocialLinks {
  platform: string;
  url: string;
}

export interface IAbout extends AboutEntry, Document {}

const skillSchema = new Schema<ISkill>(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
  },
  { _id: false },
);
const socialLinkSchema = new Schema<ISocialLinks>(
  {
    platform: { type: String, required: true },
    url: { type: String, required: true },
  },
  { _id: false },
);

const aboutSchema = new Schema<IAbout>(
  {
    name: { type: String, required: true },
    title: { type: String, required: true },
    shortBio: { type: String, required: true },
    longBio: { type: String, required: true },
    profileImage: { type: String },
    resumeUrl: { type: String },
    skills: { type: [skillSchema], default: [] },
    socialLinks: { type: [socialLinkSchema], default: [] },
    location: { type: String },
    availableForWork: { type: Boolean, default: true },
  },
  { timestamps: { createdAt: false, updatedAt: true } },
);

aboutSchema.set("toJSON", {
  transform: (_doc, returnedObject) => {
    const obj = returnedObject as unknown as Record<string, unknown>;
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});
export default model<IAbout>("About", aboutSchema);
