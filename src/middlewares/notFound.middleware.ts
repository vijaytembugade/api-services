import type { Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
    res.status(404).json({
        message: 'Sorry, the requested resource was not found.',
    });
};

export default notFound;
