import {
    getUserById,
    loginUser,
    registerUser,
} from '@controllers/user.controller';
import {
    getUserByIdValidator,
    loginUserValidator,
    registerUserValidator,
} from '@validator/user.validator';
import { Router } from 'express';
import requestValidator from '@middlewares/validator.middleware';
import upload from '@middlewares/multer.middleware';
import tokenValidator from '@middlewares/tokenValidator';

const router = Router();

/**
 * Method : POST
 * Route: /register
 * Action For user registration:
 */
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

/**
 * Method: POST
 * Route: /login
 * Action: to login user
 */
router.route('/login').post(loginUserValidator, loginUser);


/**
 * Method: GET
 * Router: /getUserById/userId
 * Action : to get user from its userId
 */
router
    .route('/getUserById/:id')
    .get(tokenValidator, getUserByIdValidator, requestValidator, getUserById);


export default router;
