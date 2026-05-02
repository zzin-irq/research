import type { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
import { AppError } from './error.js';

type Role = 'user' | 'admin' | 'super';
const RANK: Record<Role, number> = { user: 0, admin: 1, super: 2 };

declare module 'express-serve-static-core' {
  interface Request {
    user?: { sub: string; role: Role };
  }
}

export function requireAuth(req: Request, _res: Response, next: NextFunction) {
  const header = req.header('authorization');
  if (!header?.startsWith('Bearer ')) {
    return next(new AppError(401, 'unauthenticated', 'Authentication required'));
  }
  try {
    const payload = jwt.verify(header.slice(7), env.JWT_PUBLIC_KEY, { algorithms: ['RS256'] });
    if (typeof payload === 'string' || !payload.sub || !('role' in payload)) {
      throw new Error('Malformed token');
    }
    req.user = { sub: String(payload.sub), role: payload.role as Role };
    next();
  } catch {
    next(new AppError(401, 'invalid_token', 'Invalid or expired token'));
  }
}

export function requireRole(role: Role) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) return next(new AppError(401, 'unauthenticated', 'Authentication required'));
    if (RANK[req.user.role] < RANK[role]) {
      return next(new AppError(403, 'forbidden', 'Insufficient role'));
    }
    next();
  };
}
