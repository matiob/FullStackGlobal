import { /* InferSchemaType, */ Schema, model, Model } from "mongoose";
import { ITask } from '../../types';

const taskSchema: Schema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true },
  title: { type: String, required: true},
  content: { type: String, required: true },
  // isDone: { type: Boolean, required: true },
  // isDeleted: { type: Boolean, required: true },
}, { timestamps: true });

const TaskModel: Model<ITask> = model<ITask>("Task", taskSchema);

export default TaskModel;