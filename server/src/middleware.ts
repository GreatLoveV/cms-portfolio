import type { Request, Response, NextFunction } from "express";
import { newProjectSchema, newAboutSchema } from "./types.ts";
import { z } from "zod";

export const newProjectParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    newProjectSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newAboutParser = (
  req: Request,
  _res: Response,
  next: NextFunction,
) => {
  try {
    newAboutSchema.parse(req.body);
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
