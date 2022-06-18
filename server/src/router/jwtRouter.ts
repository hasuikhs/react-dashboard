import { Request, Response, Router } from 'express';
import jwt from 'jsonwebtoken';
import verifyToken from '../utils/verifyToken';
import LoginManager from '../service/impl/loginManager';
require('dotenv').config();

const jwtRouter: Router = Router();

jwtRouter.post('/', async (req: Request, res: Response) => {
  try {
    const id: string = req.body.id;
    const password: string = req.body.password;

    const loginManager = new LoginManager();

    let ret = await loginManager.login(id, password);

    if (ret === 'fail') {
      return res.status(401).json({
        code: 401,
        message: 'Unauthorized'
      });
    }

    const token =  jwt.sign({
      id, password
    }, process.env.JWT_SECRET as string, {
      expiresIn: '3m',
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
  res.json(req.body);
});

export default jwtRouter;