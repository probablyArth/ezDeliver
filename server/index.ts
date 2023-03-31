/// <reference path="./environment.d.ts" />

import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";
import { connect } from "mongoose";

config({ path: "./.env" });
connect(process.env.MONGO_URI).catch((err) => {
  console.error("An error occurred while connecting to MONGODB");
  console.log(err.message);
  process.exit(1);
});

const app = express();
const PORT = (process.env.PORT && parseInt(process.env.PORT)) || 4000;

app.use(cors({ origin: "*" }));
app.use(express.json());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

app.get("/", (req, res) => {
  return res.json({ message: "Hi" });
});

app.listen(PORT, () => {
  console.log(`Server started at ${PORT}`);
});
