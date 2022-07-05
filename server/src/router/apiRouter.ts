import { Router } from 'express';

import userRouter from './api/user.router';
import sheetRouter from './api/sheet.router';
import serverRouter from './api/server.router';

import verifyToken from '../utils/verifyToken';

const apiRouter: Router = Router();

apiRouter.use('/user', verifyToken, userRouter);
apiRouter.use('/doc', verifyToken, sheetRouter);
apiRouter.use('/server', verifyToken, serverRouter);

export default apiRouter;