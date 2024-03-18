import type { UserType } from '@controllers/types';
import bcrypt from 'bcrypt';
import { MODELS, USER_TYPE } from 'constant';
import jwt from 'jsonwebtoken';
import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema<UserType>(
    {
        username: {
            type: String,
            unique: true,
            required: [true, 'username is required'],
            lowercase: true,
            trim: true,
            index: true,
        },
        email: {
            type: String,
            unique: true,
            required: [true, 'email is required'],
            lowercase: true,
        },
        password: {
            type: String,
            unique: true,
            required: [true, 'password is required'],
        },
        userType: {
            type: String,
            enum: [
                USER_TYPE.PROJECT_MANAGER,
                USER_TYPE.TASK_OWNER,
                USER_TYPE.WATCHER,
            ],
            default: USER_TYPE.TASK_OWNER,
        },
        isAdmin: {
            type: Boolean,
            default: false,
        },
        avatar: {
            type: String,
        },
        refreshToken: {
            type: String,
        },
    },
    { timestamps: true }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 9);
    next();
});

// custom method on schema
userSchema.methods.isPasswordCorrect = async function (password: string) {
    return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateAccessToken = async function () {
    await jwt.sign(
        {
            _id: this._id,
            username: this.username,
            email: this.email,
        },
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
};

userSchema.methods.generateRefreshToken = async function () {
    await jwt.sign(
        {
            _id: this._id,
        },
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
};

export const User = mongoose.model(MODELS.USER, userSchema);
