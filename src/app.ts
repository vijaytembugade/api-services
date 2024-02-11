// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import "module-alias/register";

import express from "express";
import type { Express } from "express";

import cors from "cors";
import connectDB from "./db";

const app: Express = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
    res.status(200).json({ message: "Apis are running" });
});

app.get("/test", (req, res) => {
    res.status(200).json({ message: "Apis are running- test" });
});

connectDB();
