import express from 'express';
import type { Express } from 'express';
import userRouter from '@routes/user.routes';
import testRouter from '@routes/test.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const app: Express = express();
app.use(express.json({ limit: '16kb' }));
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.urlencoded({ extended: true, limit: '8kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// routes
app.use('/', testRouter);
app.use('/api/v1/user', userRouter);

export default app;
