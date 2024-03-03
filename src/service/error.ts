import { colorErr } from '@utils/colorCli';
import type { Response, Request } from 'express';

const apiError = (
    req: Request,
    res: Response,
    error: unknown,
    status: number
) => {
    console.log(colorErr(error));
    let message = `Unknown Error in ${req.url}`;
    if (error instanceof Error) {
        message = error.message;
    } else message = String(error);
    res.status(status).json({ error: error, message: message });
};

export default apiError;
