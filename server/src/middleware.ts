import type { Request, Response, NextFunction } from "express";
import {
  newProjectSchema,
  newAboutSchema,
  newContactSchema,
  newLoginSchema,
} from "./types.ts";
import jwt from "jsonwebtoken";
import { z } from "zod";

export const newProjectParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = newProjectSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};
export const newContactParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = newContactSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newLoginParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = newLoginSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const authHeader = req.get("Authorization");
  const token = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null;
  if (!token) {
    return res.status(401).json({ error: "token missing" });
  }

  try {
    jwt.verify(token, process.env.SECRET as string);
    return next();
  } catch {
    return res.status(401).json({ error: "invalid token" });
  }
};
export const newAboutParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    req.body = newAboutSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).send({ error: "unknown endpoint" });
};
export const errorMiddleware = (
  error: unknown,
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  if (error instanceof z.ZodError) {
    res.status(400).send({ error: error.issues });
  } else {
    next(error);
  }
};
