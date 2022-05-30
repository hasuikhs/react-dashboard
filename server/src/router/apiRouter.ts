import { Router } from 'express';

import userRouter from './api/user.router';
import docRouter from './api/doc.router';
import serverRouter from './api/server.router';

const apiRouter: Router = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/doc', docRouter);
apiRouter.use('/server', serverRouter);

export default apiRouter;