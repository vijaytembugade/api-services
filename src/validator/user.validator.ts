import { USER_TYPE } from 'constant';
import { checkSchema } from 'express-validator';

export const registerUserValidator = checkSchema({
    username: {
        notEmpty: true,
        exists: {
            errorMessage: 'User name is required',
            options: { checkFalsy: true },
        },
        isString: { errorMessage: 'User name should be string' },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Username should be at least 5 characters',
        },
        trim: true,
    },
    password: {
        notEmpty: true,
        exists: { errorMessage: 'Password is required' },
        isString: { errorMessage: 'password should be string' },
        isLength: {
            options: { min: 5 },
            errorMessage: 'Password should be at least 5 characters',
        },
    },
    email: {
        notEmpty: true,
        isEmail: { errorMessage: 'Please provide valid email' },
        trim: true,
    },
    userType: {
        optional: true,
        isIn: {
            options: [
                [
                    USER_TYPE.PROJECT_MANAGER,
                    USER_TYPE.TASK_OWNER,
                    USER_TYPE.WATCHER,
                ],
            ],
        },
    },
    avatar: {
        optional: true,
    },
    isAdmin: {
        optional: true,
        isBoolean: true,
    },
});

export const getUserByIdValidator = checkSchema({
    id: {
        notEmpty: true,
        exists: {
            errorMessage: 'user id is required',
            options: { checkFalsy: true },
        },
        // customSanitizer: {
        //     options: value => {
        //         return ObjectId.isValid(value)
        //     },
        // }
    },
});
