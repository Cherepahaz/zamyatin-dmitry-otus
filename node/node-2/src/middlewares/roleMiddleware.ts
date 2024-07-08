import { Request, Response, NextFunction } from 'express';

interface IAuthRequest extends Request {
  user?: any;
}

const roleMiddleware = (requiredRole: string) => {
  return (req: IAuthRequest, res: Response, next: NextFunction) => {
    if (req.user?.role !== requiredRole) {
      return res.status(403).json({ message: 'Forbidden' });
    }
    next();
  };
};

export default roleMiddleware;
