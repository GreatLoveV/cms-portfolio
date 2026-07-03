import dotenv from "dotenv";
dotenv.config();

import dns from "node:dns";
import express, { type Request, type Response } from "express";
import mongoose from "mongoose";
import projectsRouter from "./routes/projects.ts";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const app = express();
const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  throw new Error("MONGODB_URI is not defined in .env");
}

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((e) => console.error("MongoDB connection error:", e));

app.use(express.json());

app.get("/ping", (_req: Request, res: Response) => {
  res.send("pong");
});

app.use("/api/projects", projectsRouter);
const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
