import type { Request, Response } from 'express';

export const registerUser = (req: Request, res: Response) => {
    res.status(200).json({
        message: 'ok'
    });
};

