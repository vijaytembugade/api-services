import { MODELS, PROJECT_STATUS } from 'constant';
import mongoose, { Schema } from 'mongoose';
import type { Model } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

interface ProjectTypes {
    projectName: string;
    projectDescription?: string;
    projectOwner?: Schema.Types.ObjectId;
    userList: Array<Schema.Types.ObjectId>;
    projectStatus: PROJECT_STATUS;
}

interface ProjectModel extends Model<ProjectTypes> {
    projectWithAccess(
        userId: Schema.Types.ObjectId | string,
        projectId: Schema.Types.ObjectId | string
    ): boolean;
}

const projectSchema = new Schema<ProjectTypes, ProjectModel>(
    {
        projectName: {
            type: String,
            unique: true,
            required: [true, 'Username is required'],
            index: true,
        },
        projectDescription: {
            type: String,
        },
        projectOwner: {
            type: Schema.Types.ObjectId,
            ref: MODELS.USER,
        },
        userList: [
            {
                type: Schema.Types.ObjectId,
                ref: MODELS.USER,
            },
        ],
        projectStatus: {
            type: String,
            enum: [
                PROJECT_STATUS.ARCHIVED,
                PROJECT_STATUS.COMPLETED,
                PROJECT_STATUS.ON_GOING,
                PROJECT_STATUS.DRAFT,
            ],
            default: PROJECT_STATUS.ON_GOING,
        },
    },
    { timestamps: true }
);

// @ts-expect-error This is from another package might add later
projectSchema.plugin(mongooseAggregatePaginate);

projectSchema.static(
    'projectWithAccess',
    async function (
        userId: Schema.Types.ObjectId,
        projectId: Schema.Types.ObjectId
    ) {
        const project = await this.findById(projectId).exec();

        console.log(project?.projectOwner?.valueOf());

        if (project?.projectOwner?.valueOf() === userId) {
            return true;
        }

        if (project?.userList?.includes(userId)) {
            return true;
        }

        return false;
    }
);

export const Project = mongoose.model<ProjectTypes, ProjectModel>(
    MODELS.PROJECT,
    projectSchema
);
