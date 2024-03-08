import { Request, Response, NextFunction } from 'express';

// Middleware for logger
export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.path}`);
  next();
};