import Task from '../models/Task';
import { ITask } from '../../types'

export const taskService = {

  // Get tasks from DB
  getTasks: async (): Promise<ITask[]> => {
    try {
      const tasks = await Task.find({}).exec();
      return tasks;
    } catch (error) {
      console.error('[taskService-getTasks] ERROR->', (error as Error).message);
      throw error;
    }
  },

  // Add a task to DB
  saveTask: async (body: ITask): Promise<ITask> => {
    try {
      const task = new Task(body);
      await task.save();
      return task;
    } catch (error) {
      console.error('[taskService-saveTask] ERROR->', (error as Error).message);
      throw error;
    }
  },

  // Edit a task from DB
  putTask: async (taskId: string, body: ITask): Promise<ITask> => {
    try {
      const task = await Task.findByIdAndUpdate(taskId, body, { new: true });
      return task!;
    } catch (error) {
      console.error('[taskService-putTask] ERROR->', (error as Error).message)
      throw error
    }
  },

  // Delete a specific task from DB
  deleteTask: async (taskId: string): Promise<ITask> => {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      return task!;
    } catch (error) {
      console.error('[taskService-deleteTask] ERROR->', (error as Error).message)
      throw error
    }
  }
}