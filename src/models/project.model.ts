
import { MODELS, PROJECT_STATUS } from 'constant';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

const projectSchema = new Schema({
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
        enum: [PROJECT_STATUS.ARCHIVED, PROJECT_STATUS.COMPLETED, PROJECT_STATUS.ON_GOING, PROJECT_STATUS.DRAFT],
        default: PROJECT_STATUS.ON_GOING
    }
}, { timestamps: true });

projectSchema.plugin(mongooseAggregatePaginate);
export const Project = mongoose.model(MODELS.USER, projectSchema);
