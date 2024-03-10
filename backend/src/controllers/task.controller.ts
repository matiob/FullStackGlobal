import { Request, Response, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";
import { taskService } from "../services/task.service";
import { assertIsDefined } from "../utils/assertIsDefined";

// GET Tasks
export const getTasks = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    const tasks = await taskService.getTasks(authenticatedUserId);
    res.status(200).send(tasks);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;

// GET Task
export const getTask = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    const task = await taskService.getTask(req.params.taskId);
    if (!task) throw createHttpError(404, "Task not found");
    if (!task.userId.equals(authenticatedUserId)) throw createHttpError(401, "You cannot access this task");
    res.status(200).send(task);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;

// GET Tasks
export const getTasksByTitle = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;
  try {
    console.log('Ingresa al metodo nuevo');
    
    assertIsDefined(authenticatedUserId);
    const tasks = await taskService.getTaskByTitle(req.query.taskTitle as string, authenticatedUserId);
    res.status(200).send(tasks);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;

// POST Task
export const postTask = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    const task = await taskService.saveTask(authenticatedUserId, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;

// EDIT Task
export const editTask = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;
  try {
    const { title, content } = req.body;
    if (!title || !content) throw createHttpError(400, "Task must have a title and content!");
    assertIsDefined(authenticatedUserId);
    const task = await taskService.putTask(
      req.params.taskId,
      req.body,
      authenticatedUserId
    );
    if (!task) throw createHttpError(404, "Task not found");
    if (!task.userId.equals(authenticatedUserId)) throw createHttpError(401, "You cannot access this task");
    res.status(200).json(task);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;

// REMOVE Task
export const deleteTask = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authenticatedUserId = req.session.userId;
  try {
    assertIsDefined(authenticatedUserId);
    const isValidId = taskService.validataMongoId(req.params.taskId);
    if (!isValidId) throw createHttpError(400, "Invalid task id");
    const task = await taskService.deleteTask(req.params.taskId);
    if (!task) throw createHttpError(404, "Task not found");
    if (!task.userId.equals(authenticatedUserId)) throw createHttpError(401, "You cannot access this task");
    res.sendStatus(204);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;
