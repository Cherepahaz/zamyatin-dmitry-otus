import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface IAuthRequest extends Request {
  user?: any;
}

const authMiddleware = (req: IAuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }
  try {
    const decoded = jwt.verify(token, 'secret_key');
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware;