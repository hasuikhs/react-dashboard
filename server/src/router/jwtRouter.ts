import { NextFunction, Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const verifyToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    req.body.decoded = jwt.verify(req.headers.authorization || '', process.env.JWT_SECRET || '');
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(419).json({
        code: 419,
        message: 'Expired token.'
      });
    }

    return res.status(401).json({
      code: 401,
      message: 'Invalid token.'
    });
  }
}