import jwt from 'jsonwebtoken';
import type { NextFunction, Request, Response } from 'express';
import apiError from '@service/error';

const tokenValidator = (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req?.headers?.authorization?.split(' ')[1];
        // if (!token) {
        //     // if token if from query params
        //     token = req?.query?.token
        // }
        if (!token) {
            throw Error('Provide a token');
        }

        const secret = process?.env?.JWT_TOKEN_SECRET || 'randomTokenSecret';
        jwt.verify(token, secret, (err: unknown, decodedToken) => {
            if (err) {
                throw Error('Invalid Token');
            }
            if (decodedToken) {
                console.log(decodedToken);
                req.body.tokenInfo = decodedToken;
            }
            next();
        });
    } catch (err) {
        apiError(req, res, err, 401);
    }
};

export default tokenValidator;
