import type { Request, Response } from 'express';
import { Project } from '@models/project.model';
import apiError from '@service/error';
import { User } from '@models/user.model';
import { USER_TYPE } from 'constant';
import getUserIdFromRequest from '@utils/getUserIdFromRequest';

export const createProject = async (req: Request, res: Response) => {
    try {
        const {
            projectName,
            projectDescription,
            projectOwner,
            userList,
            projectStatus,
        } = req.body;

        const userId = getUserIdFromRequest(req);

        const isProjectNameExist = await Project.findOne({ projectName });

        if (isProjectNameExist) {
            throw new Error('Project name already exist, try new one');
        }

        const userType = await User.findOne({ _id: userId }).select('userType');

        if (userType) {
            if (userType?.userType !== USER_TYPE.PROJECT_MANAGER) {
                apiError(
                    req,
                    res,
                    `Project can be created only by ${USER_TYPE.PROJECT_MANAGER}`,
                    403
                );
                return;
            }
        }

        const project = await Project.create({
            projectName,
            projectDescription,
            projectOwner,
            userList,
            projectStatus,
        });

        if (!project) {
            throw new Error('Project Creation failed');
        }
        res.status(201).json(project);
    } catch (err) {
        apiError(req, res, err, 400);
    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        const userId = getUserIdFromRequest(req);

        const isProjectWithAccess = await Project?.projectWithAccess(
            userId,
            id
        );

        if (!isProjectWithAccess) {
            apiError(req, res, 'Unathorised Access', 403);
            return;
        }

        const project = await Project.findById(id).exec();

        if (!project) {
            apiError(req, res, 'Project Not Found', 400);
        }

        res.status(200).json(project);
    } catch (err) {
        apiError(req, res, err, 400);
    }
};

export const updateProject = async (req: Request, res: Response) => {
    try {
        const userId = getUserIdFromRequest(req);
        const { id } = req.params;

        const isProjectWithAccess = await Project.projectWithAccess(userId, id);

        if (!isProjectWithAccess) {
            apiError(req, res, 'Unathorised Access', 403);
            return;
        }

        const body = req.body;

        const updatedProject = await Project.findByIdAndUpdate(id, body, {
            new: true,
        });

        if (!updateProject) {
            throw new Error('Project Not Found');
        }

        res.status(200).json(updatedProject);
    } catch (error) {
        apiError(req, res, error, 400);
    }
};
