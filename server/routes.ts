import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import fs from "fs";
import path from "path";

export async function registerRoutes(app: Express): Promise<Server> {
  // Serve JSON data files
  app.get("/api/questions", async (req, res) => {
    try {
      const questionsPath = path.resolve(import.meta.dirname, "..", "client", "public", "questions_v1.json");
      const questionsData = await fs.promises.readFile(questionsPath, "utf-8");
      res.json(JSON.parse(questionsData));
    } catch (error) {
      res.status(404).json({ error: "Questions data not found" });
    }
  });

  app.get("/api/descriptions", async (req, res) => {
    try {
      const descriptionsPath = path.resolve(import.meta.dirname, "..", "client", "public", "descriptions_ko_v2.json");
      const descriptionsData = await fs.promises.readFile(descriptionsPath, "utf-8");
      res.json(JSON.parse(descriptionsData));
    } catch (error) {
      res.status(404).json({ error: "Descriptions data not found" });
    }
  });

  // use storage to perform CRUD operations on the storage interface
  // e.g. storage.insertUser(user) or storage.getUserByUsername(username)

  const httpServer = createServer(app);

  return httpServer;
}
