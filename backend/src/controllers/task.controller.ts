import { Request, Response, RequestHandler, NextFunction } from 'express'
import { taskService } from '../services/task.service'

// GET Task
export const getTasks = (async (_req: Request, res: Response, next: NextFunction ) => {
  try {
    const tasks = await taskService.getTasks();
    return tasks != null ? res.status(200).send(tasks) : res.sendStatus(401);
  } catch(error) {
    next(error);
    return;
  }
}) as RequestHandler

// POST Task
export const postTask = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.saveTask(req.body);
    return task != null ? res.status(201).json(task) : res.sendStatus(401);
  } catch(error) {
    next(error);
    return;
  }
  // return res.status(500).send("Internal Server Error");
}) as RequestHandler

// EDIT Task
export const editTask = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.putTask(req.params.taskId, req.body);
    return task != null ? res.status(200).json(task) : res.sendStatus(401);
  } catch(error) {
    next(error);
    return;
  }
}) as RequestHandler

// REMOVE Task
export const deleteTask = (async (req: Request, res: Response, next: NextFunction) => {
  try {
    const task = await taskService.deleteTask(req.params.taskId);
    return task != null ? res.sendStatus(204) : res.sendStatus(401);
  } catch(error) {
    next(error);
    return;
  }
}) as RequestHandler
