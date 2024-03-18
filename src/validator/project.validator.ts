import { PROJECT_STATUS } from 'constant';
import { checkSchema } from 'express-validator';

export const projectCreateValidator = checkSchema({
    projectName: {
        notEmpty: { errorMessage: 'Project Name should be provided!' },
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'Project Name should be at least 5 characters',
        },
    },
    projectDescription: {
        notEmpty: { errorMessage: 'Project Description should be provided!' },
        trim: true,
        isLength: {
            options: { min: 5 },
            errorMessage: 'Description should be at least 5 characters',
        },
    },
    projectOwner: {
        notEmpty: { errorMessage: 'Project Owner should be provided!' },
    },
    userList: {
        optional: true,
        isArray: true,
    },
    projectStatus: {
        optional: true,
        isIn: {
            options: [
                [
                    PROJECT_STATUS.ARCHIVED,
                    PROJECT_STATUS.COMPLETED,
                    PROJECT_STATUS.ON_GOING,
                    PROJECT_STATUS.DRAFT,
                ],
            ],
        },
    },
});
