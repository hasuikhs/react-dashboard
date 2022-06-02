import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../utils/verifyToken';
require('dotenv').config();

const jwtRouter: Router = Router();

jwtRouter.post('/', async (req: Request, res: Response) => {
  try {
    const id: string = 'test';
    const name: string = 'name';
    const token = jwt.sign({
      id, name
    }, process.env.JWT_SECRET as string, {
      expiresIn: '5m',
      issuer: 'issuer'
    });

    return res.status(200).json({
      code: 200,
      message: 'Issue token.',
      token
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      code: 500,
      message: 'Server error.'
    });
  }
});

jwtRouter.get('/test', verifyToken, (req: Request, res: Response) => {
  res.json(req.body.decoded);
});

export default jwtRouter;