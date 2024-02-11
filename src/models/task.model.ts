import { MODELS, TASK_STATUS } from 'constant';
import mongoose, { Schema } from 'mongoose';
import mongooseAggregatePaginate from 'mongoose-aggregate-paginate-v2';

const taskSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'title is required'],
            index: true,
        },
        description: {
            type: String,
        },
        assignedTo: {
            type: Schema.Types.ObjectId,
            ref: MODELS.USER,
            required: true,
        },
        watcher: {
            type: Schema.Types.ObjectId,
            ref: MODELS.USER,
        },
        projectId: {
            type: Schema.Types.ObjectId,
            ref: MODELS.PROJECT,
            required: true,
        },
        taskStatus: {
            type: String,
            enum: [
                TASK_STATUS.COMPLETED,
                TASK_STATUS.IN_PROGRESS,
                TASK_STATUS.PARKED,
                TASK_STATUS.TODO,
            ],
            default: TASK_STATUS.TODO,
        },
        targetDeadLine: {
            type: Date,
        },
    },
    { timestamps: true }
);

taskSchema.plugin(mongooseAggregatePaginate);
export const Task = mongoose.model(MODELS.TASK, taskSchema);
