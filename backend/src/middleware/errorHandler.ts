import type { Request, Response, NextFunction } from 'express';

// 4-argument signature is required for Express to recognise this as an error handler.
export function errorHandler(err: unknown, _req: Request, res: Response, _next: NextFunction): void {
  console.error(err);
  res.status(500).json({ message: 'Internal server error' });
}
