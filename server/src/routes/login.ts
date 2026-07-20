import express from "express";
import type { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { newLoginParser } from "../middleware.ts";
import { LoginBody } from "../types.ts";

const router = express.Router();

router.post(
  "/",
  newLoginParser,
  async (req: Request<unknown, unknown, LoginBody>, res: Response) => {
    const { username, password } = req.body;

    if (username !== process.env.ADMIN_USERNAME) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const passwordCorrect = await bcrypt.compare(
      password,
      process.env.ADMIN_PASSWORD as string,
    );

    if (!passwordCorrect) {
      return res.status(401).json({ error: "invalid credentials" });
    }

    const token = jwt.sign({ username }, process.env.SECRET as string, {
      expiresIn: "7d",
    });

    return res.status(200).json({ token, username });
  },
);

export default router;
