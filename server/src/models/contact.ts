import { model, Schema, Document } from "mongoose";
import type { ContactEntry } from "../types.ts";
import { SUBJECTS } from "../types.ts";

interface IContact extends ContactEntry, Document {
  createdAt: Date;
}

const contactSchema = new Schema<IContact>(
  {
    name: { type: String, required: true, minlength: 2, maxlength: 50 },
    email: { type: String, required: true },
    subject: {
      type: String,
      required: true,
      enum: Object.values(SUBJECTS),
    },
    message: { type: String, required: true, minlength: 20, maxlength: 2000 },
  },
  { timestamps: { createdAt: true, updatedAt: false } },
);

contactSchema.set("toJSON", {
  transform: (_doc, returnedObject) => {
    const obj = returnedObject as unknown as Record<string, unknown>;
    obj.id = obj._id;
    delete obj._id;
    delete obj.__v;
  },
});

export default model<IContact>("Contact", contactSchema);
