// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
import { replaceTscAliasPaths } from 'tsc-alias';
replaceTscAliasPaths();
import cors from 'cors';
import express from 'express';
import cookieParser from 'cookie-parser';
import { colorErr, colorInfo, colorSuccess } from '@utils/colorCli';
import connectDB from './db';
import app from './app';

app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '8kb' }));
app.use(express.static('public'));
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
                console.log(
                    colorSuccess(`See on http://localhost:${process.env.PORT}`)
                );
            });
            return;
        }
        throw Error('DATABASE is not connected');
    } catch (err) {
        console.log(colorErr(err));
    }
};

server();
