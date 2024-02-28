import express from 'express';
import type { Express } from 'express';
import userRouter from '@routes/user.routes';
import testRouter from '@routes/test.routes';

const app: Express = express();

app.use('/', testRouter);
app.use('/api/v1/user', userRouter);

export default app;
