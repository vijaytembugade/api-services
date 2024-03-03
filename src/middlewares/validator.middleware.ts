import { validationResult } from 'express-validator';
import type { NextFunction, Request, Response } from 'express';

const requestValidator = (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            success: false,
            errors: errors.array(),
        });
    }
    next();
};

export default requestValidator;
