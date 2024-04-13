import { MODELS, PROJECT_STATUS } from 'constant';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const projectSchema = new Schema(
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

projectSchema.plugin(mongooseAggregatePaginate);

projectSchema.statics.projectWithAccess = async function (userId: Schema.Types.ObjectId, projectId: Schema.Types.ObjectId,) {
    const project = this.findById(projectId);

    if (project?.projectOwner?.valueOf() === userId) {
        return true;
    }

    if (project?.userList?.includes(userId)) {
        return true
    }

    return false
};
export const Project = mongoose.model(MODELS.PROJECT, projectSchema);
