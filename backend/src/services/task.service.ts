import mongoose from 'mongoose';
import Task from '../models/Task';
import { ITask } from '../../types';

export const taskService = {

  // Get tasks from DB
  getTasks: async (authenticatedUserId: any): Promise<ITask[]> => {
    try {
      const tasks = await Task.find({ userId: authenticatedUserId });
      return tasks;
    } catch (error) {
      console.error('[taskService-getTasks] ERROR->', (error as Error).message);
      throw error;
    }
  },

  // Get a task detail from DB
  getTask: async (taskId: string): Promise<ITask | null> => {
    try {
      const task = await Task.findById(taskId);
      return task;
    } catch (error) {
      console.error('[taskService-getTask] ERROR->', (error as Error).message);
      throw error;
    }
  },

  // Get a task by name from DB -- FILTER
  getTaskByTitle: async (taskTitle: string, authenticatedUserId: any): Promise<ITask[]> => {
    try {
      // Mongo filter -> const tasks = await Task.find({ userId: authenticatedUserId, title: taskTitle });
      const tasks = await Task.find({ userId: authenticatedUserId });
      return tasks.filter(task => task.title.includes(taskTitle));
    } catch (error) {
      console.error('[taskService-getTaskByTitle] ERROR->', (error as Error).message);
      throw error;
    }
  },

  // Add a task to DB
  saveTask: async (authenticatedUserId: any, body: ITask): Promise<ITask> => {
    try {
      body.userId = authenticatedUserId;
      const task = new Task(body);
      await task.save();
      return task;
    } catch (error) {
      console.error('[taskService-saveTask] ERROR->', (error as Error).message);
      throw error;
    }
  },

  // Edit a task from DB
  putTask: async (taskId: string, body: ITask, authenticatedUserId: any): Promise<ITask | null> => {
    try {
      body.userId = authenticatedUserId;
      const task = await Task.findByIdAndUpdate(taskId, body, { new: true });
      return task;
    } catch (error) {
      console.error('[taskService-putTask] ERROR->', (error as Error).message)
      throw error
    }
  },

  // TODO: Update a task from DB
  /* doneTask: async (taskId: string, body: ITask, authenticatedUserId: any): Promise<ITask | null> => {
    try {
      body.userId = authenticatedUserId;
      body.isDone = true;
      const task = await Task.findByIdAndUpdate(taskId, body, { new: true });
      return task;
    } catch (error) {
      console.error('[taskService-putTask] ERROR->', (error as Error).message)
      throw error
    }
  }, */

  // Delete a specific task from DB
  // TODO: Implement logical deletion similar to update
  deleteTask: async (taskId: string): Promise<ITask | null> => {
    try {
      const task = await Task.findByIdAndDelete(taskId);
      return task;
    } catch (error) {
      console.error('[taskService-deleteTask] ERROR->', (error as Error).message)
      throw error
    }
  },

  // Validate ID
  validataMongoId: async (taskId: string): Promise<boolean> => {
    return (!mongoose.isValidObjectId(taskId));
  }
}