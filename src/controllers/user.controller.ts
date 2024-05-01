import apiError from '@service/error';
import type { Request, Response } from 'express';
import { User } from '@models/user.model';
import fileUpload from '@service/fileUpload';
import { redisClient } from '@service/redis';
import createToken from '@utils/createToken';
import bcrypt from 'bcrypt';

export const registerUser = async (req: Request, res: Response) => {
    try {
        const { username, email, password, userType, isAdmin } = req.body;

        const userExist = await User.findOne({
            $or: [{ username }, { email }],
        });
        if (userExist) {
            throw new Error('username or email already Exist');
        }

        const emailExist = await User.findOne({ email });
        if (emailExist) {
            throw new Error('Email is is already in use');
        }

        const files = req?.files as {
            [fieldname: string]: Express.Multer.File[];
        };

        const avatarImg = files?.avatar[0]?.path;

        if (!avatarImg) {
            throw new Error('Avatar image is not available');
        }

        const avtarUrl = await fileUpload(avatarImg);

        if (!avtarUrl) {
            throw new Error('Avatar image upload failed');
        }

        const user = await User.create({
            username,
            email,
            password,
            userType,
            isAdmin,
            avatar: avtarUrl?.url,
        });

        if (user) {
            const refreshToken = await createToken({ id: user?._id });
            await User.findByIdAndUpdate(user._id, {
                refreshToken: refreshToken,
            });
        }

        const createdUser = await User.findById(user._id).select('-password ');

        if (!createdUser) {
            throw Error('User creation failed');
        }

        if (redisClient) {
            await redisClient.set(
                createdUser?._id.toJSON(),
                JSON.stringify(createdUser)
            );
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

        if (redisClient) {
            const userString = await redisClient.get(id);
            if (userString) {
                const user = JSON.parse(userString);
                res.status(200).json({ ...user, cached: true });
                return;
            }
        }
        const userFromDb = await User.findById(id).lean().select(['-password']);
        if (!userFromDb) {
            throw new Error('User Not Found');
        }
        res.status(200).json({ ...userFromDb });
    } catch (err) {
        apiError(req, res, err, 400);
    }
};

export const loginUser = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).lean();
        if (!user) {
            throw new Error('User does not exist');
        }

        if (!user?.password) {
            throw new Error('Password not available');
        }
        const isPasswordCorrect = await bcrypt.compare(
            password,
            user?.password
        );

        if (!isPasswordCorrect) {
            throw new Error('Password is incorrect');
        }

        if (user && isPasswordCorrect) {
            const refreshToken = await createToken({ id: user?._id });
            await User.updateOne(
                { _id: user._id },
                {
                    refreshToken: refreshToken,
                }
            );
        }

        const {
            email: userEmail,
            refreshToken,
            username,
            avatar,
            isAdmin,
            userType,
            _id,
        } = user;

        if (redisClient) {
            await redisClient.set(
                user?._id.toJSON(),
                JSON.stringify({
                    email: userEmail,
                    refreshToken,
                    username,
                    avatar,
                    isAdmin,
                    userType,
                    _id,
                })
            );
        }

        res.status(200).json({
            email: userEmail,
            refreshToken,
            username,
            avatar,
            isAdmin,
            userType,
            id: _id,
        });
    } catch (err) {
        apiError(req, res, err, 400);
    }
};
