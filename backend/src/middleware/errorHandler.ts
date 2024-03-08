import {
  Request,
  Response,
  NextFunction,
  RequestHandler,
  ErrorRequestHandler,
} from "express";
import { Error as MongooseError } from 'mongoose';
import { isHttpError } from "http-errors";

export const notFound: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const error = new Error(`⛔ [ERROR] Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let errorName = 'Server error';
  let errorMessage = "An unknown error occurred";

  // Error type
  if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    errorName = 'ValidationError';
    errorMessage = err.message;
  }
  if (isHttpError(err)) {
    statusCode = err.status;
    errorName = err.name;
    errorMessage = err.message;
  }

  /* err.name === 'ValidationError' && (statusCode = 400);
  err.name === 'BadRequestError' && (statusCode = 400);
  err.name === 'UnauthorizedError' && (statusCode = 401);
  err.name === 'ForbiddenError' && (statusCode = 403); */

  console.error(err);
  res.status(statusCode);
  res.json({
    error: `⛔ ${errorName}`,
    message: `${errorMessage}`,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// if (err instanceof MongooseError.ValidationError) res.status(400).json({ error: err.message });