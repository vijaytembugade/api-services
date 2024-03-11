import { getUserById, registerUser } from '@controllers/user.controller';
import {
    getUserByIdValidator,
    registerUserValidator,
} from '@validator/user.validator';
import { Router } from 'express';
import requestValidator from '@middlewares/validator.middleware';
import upload from '@middlewares/multer.middleware';

const router = Router();

router.route('/register').post(
    upload.fields([
        {
            name: 'avatar',
            maxCount: 1,
        },
    ]),
    registerUserValidator,
    requestValidator,
    registerUser
);

router
    .route('/getUserById/:id')
    .get(getUserByIdValidator, requestValidator, getUserById);

export default router;
