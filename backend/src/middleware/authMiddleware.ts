import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface AuthPayload {
  userId: number;
  email: string;
}

export function authMiddleware(req: Request, res: Response, next: NextFunction): void {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Authentication required' });
    return;
  }

  const token = authHeader.slice(7);
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    next(new Error('JWT_SECRET is not configured'));
    return;
  }

  try {
    const payload = jwt.verify(token, secret) as jwt.JwtPayload & AuthPayload;
    req.user = { id: payload.userId, email: payload.email };
    next();
  } catch {
    res.status(401).json({ message: 'Invalid or expired token' });
  }
}
