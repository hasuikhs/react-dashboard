import { Router } from 'express';

import { userRouter, sheetRouter, serverRouter, groupRouter, licenseRouter } from './api';

const apiRouter: Router = Router();

apiRouter.use('/user', userRouter);
apiRouter.use('/sheet', sheetRouter);
apiRouter.use('/server', serverRouter);
apiRouter.use('/group', groupRouter);
apiRouter.use('/license', licenseRouter);

export default apiRouter;