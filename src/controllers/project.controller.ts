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

        const project = await Project.findById(id);

        if (
            userId !== project?.projectOwner?.valueOf() &&
            !project?.userList?.includes(userId)
        ) {
            throw new Error('Unauthorised , cannot access the project');
        }
        if (!project) {
            throw new Error('Project is not available');
        }

        res.status(200).json(project);
    } catch (err) {
        apiError(req, res, err, 400);
    }
};

export const updateProject = async (req: Request, res: Response) => {
    const userId = getUserIdFromRequest(req);

    const project = await Project.findById(id);

    if (
        userId !== project?.projectOwner?.valueOf() &&
        !project?.userList?.includes(userId)
    ) {
        throw new Error('Unauthorised , cannot access the project');
    }
    if (!project) {
        throw new Error('Project is not available');
    }

    const { id } = req.params;

    res.send(200);
};
