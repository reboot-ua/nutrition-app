import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import { authConfig } from '../config/auth.config'

export interface AuthRequest extends Request {
  user?: {
    id: string
    email: string
  }
}

export const authMiddleware = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    res.status(401).json({ error: 'Токен не надано' })
    return
  }

  try {
    const decoded = jwt.verify(token, authConfig.jwt.secret) as { id: string; email: string }
    req.user = decoded
    next()
  } catch (error) {
    res.status(401).json({ error: 'Недійсний токен' })
    return
  }
} 