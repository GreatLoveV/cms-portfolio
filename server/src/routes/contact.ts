import express from "express";
import type { Request, Response } from "express";
import Contact from "../models/contact.ts";
import type { NewContactEntry, ContactEntry, ApiError } from "../types.ts";
import { newContactParser, requireAuth } from "../middleware.ts";

const router = express.Router();

router.get(
  "/",
  requireAuth,
  async (_req: Request, res: Response<ContactEntry[] | ApiError>) => {
    try {
      const contacts = await Contact.find({}).sort({ createdAt: -1 });
      return res.status(200).json(contacts);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "failed to fetch contacts" });
    }
  },
);

router.get(
  "/:id",
  async (
    req: Request<{ id: string }>,
    res: Response<ContactEntry | ApiError>,
  ) => {
    try {
      const contact = await Contact.findById(req.params.id);
      if (!contact) {
        return res.status(404).json({ error: "Contact not found" });
      }
      return res.status(200).json(contact);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Failed to fetch contact" });
    }
  },
);

router.post(
  "/",
  newContactParser,
  async (
    req: Request<unknown, unknown, NewContactEntry>,
    res: Response<ContactEntry | ApiError>,
  ) => {
    try {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { honeypot, ...contactData } = req.body;
      const newContact = new Contact(contactData);
      const savedContact = await newContact.save();
      return res.status(201).json(savedContact);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "failed to submit message" });
    }
  },
);
