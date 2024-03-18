import tokenValidator from '@middlewares/tokenValidator';
import testRouter from '@routes/test.routes';
import userRouter from '@routes/user.routes';
import projectRouter from '@routes/project.routes';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import type { Express } from 'express';
import express from 'express';
import notFound from '@middlewares/notFound.middleware';

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
app.use('/api/v1/project', projectRouter);
app.use('/', testRouter);
app.use(notFound);
export default app;
