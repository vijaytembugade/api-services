import tokenValidator from '@middlewares/tokenValidator';
import testRouter from '@routes/test.routes';
import userRouter from '@routes/user.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';

const app: Express = express();
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
        credentials: true,
    })
);
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ extended: true, limit: '16kb' }));
app.use(express.static('public'));
app.use(cookieParser());

// routes

app.use('/api/v1/user', userRouter);
app.use(tokenValidator);
app.use('/', testRouter);
export default app;
