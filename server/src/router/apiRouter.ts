import { Router } from 'express';

import userRouter from './api/user.router';
import sheetRouter from './api/sheet.router';
import serverRouter from './api/server.router';
import groupRouter from './api/group.router';
import licenseRouter from './api/license.router';

const apiRouter: Router = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/sheet', sheetRouter);
apiRouter.use('/server', serverRouter);
apiRouter.use('/group', groupRouter);
apiRouter.use('/license', licenseRouter);

export default apiRouter;