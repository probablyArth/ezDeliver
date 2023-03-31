import express from "express";
import cors from "cors";
import { config } from "dotenv";
import morgan from "morgan";

config({ path: "./.env" });

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
