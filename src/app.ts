import express from "express";
import type { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";

const app: Express = express();

dotenv.config();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.status(200).json({ message: "Apis are running" });
});

app.get("/test", (req, res) => {
  res.status(200).json({ message: "Apis are running- test" });
});

app.listen(process.env.PORT, () => {
  console.log("app is running on PORT", process.env.PORT);
});
