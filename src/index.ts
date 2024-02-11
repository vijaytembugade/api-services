// eslint-disable-next-line @typescript-eslint/no-var-requires
require("dotenv").config();
import "module-alias/register";

import cors from "cors";
import express from "express";
import cookieParser from "cookie-parser";
import type { Express } from "express";
import { colorErr, colorInfo } from "@utils/colorCli";
import connectDB from "./db";

const app: Express = express();

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "8kb" }));
app.use(express.static("public"));
app.use(cookieParser());

const server = async () => {
    try {
        const isConnected = await connectDB();
        if (isConnected) {
            app.listen(process.env.PORT || 8000, () => {
                console.log(
                    colorInfo(
                        `APIs are running on port ${process.env.PORT || 8000}`
                    )
                );
            });
            return;
        }
        throw Error("DATABASE is not connected");
    } catch (err) {
        console.log(colorErr(err));
    }
};

server();
