/// <reference path="./environment.d.ts" />

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

config({ path: "./.env" });

const app = express();
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.get("/", async (req, res) => {
  return res.json({ message: "hi" });
});

app.listen(PORT, () => {
  console.log(`Server listening at ${PORT}`);
});
