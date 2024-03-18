import { createProject, getProjectById } from '@controllers/project.controller';
import requestValidator from '@middlewares/validator.middleware';
import { projectCreateValidator } from '@validator/project.validator';
import { Router } from 'express';

const router = Router();

/**
 * Method: POST
 * Route: /createProject
 * Action: to create project
 */
router
    .route('/createProject')
    .post(projectCreateValidator, requestValidator, createProject);

/**
 * Method: GET
 * Route: /getProjectById/:projectId
 * Action: to get project by its id
 */
router.route('/getProjectById/:id').get(getProjectById);

export default router;
