import type { Request, Response } from 'express';
import { Project } from '@models/project.model';
import apiError from '@service/error';

export const createProject = async (req: Request, res: Response) => {
    try {
        const {
            projectName,
            projectDescription,
            projectOwner,
            userList,
            projectStatus,
        } = req.body;

        const isProjectNameExist = await Project.findOne({ projectName });

        if (isProjectNameExist) {
            throw new Error('Project name already exist, try new one');
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
        const project = await Project.findById(id);

        if (!project) {
            throw new Error('Project is not available');
        }
        res.status(200).json(project);
    } catch (err) {
        apiError(req, res, err, 400);
    }
};
