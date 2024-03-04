import apiError from '@service/error';
import type { Request, Response } from 'express';
import { User } from '@models/user.model';
import fileUpload from '@service/fileUpload';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, userType, isAdmin } =
            req.body;

        const userExit = await User.findOne({ $or: [{ username }, { email }] });
        if (userExit) {
            throw new Error('username or email already Exist');
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            throw new Error('Email is is already in use');
        }

        const files = req?.files as { [fieldname: string]: Express.Multer.File[] };
        const avatarImg = files?.avatar[0]?.path;

        if (!avatarImg) {
            throw new Error("Avatar image is not available")
        }

        const avatarUrl = await fileUpload(avatarImg)
        if (!avatarUrl) {
            throw new Error("Avatar image upload failed")
        }

        const user = await User.create({
            username,
            email,
            password,
            userType,
            isAdmin,
            avatar: avatarUrl.url,
        });

        const createdUser = await User.findById(user._id).select("-password -refreshToken")

        if (!createdUser) {
            throw Error("User creation failed")
        }

        res.status(201).json({
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
