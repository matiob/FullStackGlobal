import {
  Request,
  Response,
  NextFunction,
  ErrorRequestHandler,
} from "express";
import { Error as MongooseError } from 'mongoose';
import { isHttpError } from "http-errors";

export const errorHandler: ErrorRequestHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // Default error
  let statusCode = 500;
  let errorName = 'Server error';
  let errorMessage = "An unknown error occurred";

  // Error type
  if (err instanceof MongooseError) {
    statusCode = 400;
    errorName = 'DataBaseError';
    errorMessage = err.message;
  }
  if (isHttpError(err)) {
    statusCode = err.status;
    errorName = err.name;
    errorMessage = err.message;
  }

  console.error(err);
  res.status(statusCode);
  res.json({
    error: `⛔ ${errorName}`,
    message: `${errorMessage}`,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

// if (err instanceof MongooseError.ValidationError) res.status(400).json({ error: err.message });