import About from "../models/about.ts";
import type { Response, Request } from "express";
import express from "express";
import { newAboutParser } from "../middleware.ts";
import type { NewAboutEntry, AboutEntry, ApiError } from "../types.ts";

const router = express.Router();

router.get("/", async (_req, res: Response<AboutEntry | ApiError>) => {
  try {
    const about = await About.findOne({});
    if (!about) {
      return res.status(404).json({ error: "About info not found" });
    }
    return res.status(200).json(about);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "failed to fetch info" });
  }
});

router.put(
  "/",
  newAboutParser,
  async (
    req: Request<unknown, unknown, NewAboutEntry>,
    res: Response<AboutEntry | ApiError>,
  ) => {
    try {
      const updatedAbout = await About.findOneAndUpdate({}, req.body, {
        upsert: true,
        new: true,
        runValidators: true,
      });
      return res.status(200).json(updatedAbout);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Could not update about" });
    }
  },
);

export default router;
