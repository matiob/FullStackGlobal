import { /* InferSchemaType, */ Schema, model, Model } from "mongoose";
import { ITask } from '../../types';

const taskSchema: Schema = new Schema({
  title: { type: String, required: true},
  content: { type: String, required: true },
}, { timestamps: true });

// type Task = InferSchemaType<typeof taskSchema>;

const TaskModel: Model<ITask> = model<ITask>("Task", taskSchema);

export default TaskModel;