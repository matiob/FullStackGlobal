import { Request, Response, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";
import { userService } from "../services/user.service";

// GET Authenticated User
export const getUserById = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.session.userId!);
    res.status(200).send(user);
  } catch (error) {
    console.error((error as Error).stack);
    next(error);
  }
}) as RequestHandler;

// SIGNUP User
export const signUp = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {username, email, password } = req.body;
  if (!username || !email || !password) {
    throw createHttpError(400, "Parameters missing");
  }

  try {
    const existingUserName = await userService.getUserByName(username);
    if (existingUserName) {
      throw createHttpError(
        409,
        "Username already taken. Please choose a different one or log in instead."
      );
    }

    const existingEmail = await userService.getUserByEmail(email);
    if (existingEmail) {
      throw createHttpError(
        409,
        "A user with this email address already exists. Please log in instead."
      );
    }

    const newUser = await userService.saveUser(req.body);

    req.session.userId = newUser._id;
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

// LOGIN User
export const login = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    throw createHttpError(400, "Parameters missing");
  }

  try {
    const user = await userService.getUserByName(username);
    if (!user) throw createHttpError(401, "Invalid credentials");
    const passwordMatch = await userService.comparePassword(password, user.password);
    if (!passwordMatch) throw createHttpError(401, "Invalid credentials");

    req.session.userId = user._id;
    res.status(201).json(user);
  } catch (error) {
    next(error);
  }
}) as RequestHandler;

// LOGOUT User
export const logout = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  return req.session.destroy((error) => (error ? next(error) : res.sendStatus(200)));
}) as RequestHandler;
