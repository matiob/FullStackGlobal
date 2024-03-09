import { Request, Response, RequestHandler, NextFunction } from "express";
import createHttpError from "http-errors";
import { userService } from "../services/user.service";

// GET User
export const getUserById = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await userService.getUserById(req.session.userId!); // TODO
    return user != null ? res.status(200).send(user) : res.sendStatus(401);
  } catch (error) {
    next(error);
    return;
  }
}) as RequestHandler;

// SIGNUP User
export const signUp = (async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {userName, email, password } = req.body;
  if (!userName || !email || !password) {
    throw createHttpError(400, "Parameters missing");

    /* res.status(400)
      .send({
        status: "FAILED",
        data: {
          error:
            "One of the following keys is missing or is empty in request body: 'userName', 'email', 'password'",
        },
      }); */
  }

  try {
    const existingUserName = await userService.getUserByName(userName);
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
  const userName = req.body.username;
  const password = req.body.password;
  if (!userName || !password) {
    throw createHttpError(400, "Parameters missing");
  }

  try {
    const user = await userService.getUserByName(userName);
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
  req.session.destroy((error) => (error ? next(error) : res.sendStatus(200)));
}) as RequestHandler;
