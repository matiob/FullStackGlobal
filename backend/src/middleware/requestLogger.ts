import { Request, Response, NextFunction } from 'express';

// Middleware for logger
// Log output example: [2024-03-09T10:30:45.516Z] POST /api/tasks
export const requestLogger = (req: Request, _res: Response, next: NextFunction) => {
  const now = new Date();
  console.log(`[${now.toISOString()}] ${req.method} ${req.path}`);
  next();
};