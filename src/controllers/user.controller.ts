import apiError from '@service/error';
import type { Request, Response } from 'express';
import { User } from '@models/user.model';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, userType, isAdmin, avatar } =
            req.body;

        const userExit = await User.findOne({ username });
        if (userExit) {
            throw new Error('User Already Exist');
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            throw new Error('Email is is already in use');
        }

        const createdUser = await User.create({
            username,
            email,
            password,
            userType,
            isAdmin,
            avatar,
        });
        console.log(createdUser);

        res.status(200).json({
            createdUser,
        });
    } catch (err) {
        apiError(req, res, err, 400);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const user = await User.findById(id).lean().select(['-password']);
        if (!user) {
            throw new Error('User Not Found');
        }
        res.status(200).json({ ...user });
    } catch (err) {
        apiError(req, res, err, 400);
    }
};
