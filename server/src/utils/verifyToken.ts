import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
require('dotenv').config();

function verifyToken(req: Request, res: Response, next: NextFunction) {
  try {
    jwt.verify(req.headers.authorization as string, process.env.JWT_SECRET as string);
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

export default verifyToken;