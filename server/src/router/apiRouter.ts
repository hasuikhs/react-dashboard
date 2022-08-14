import { Router } from 'express';

import { dataRouter, userRouter, sheetRouter, serverRouter, groupRouter, licenseRouter } from './api';

const apiRouter: Router = Router();

apiRouter.use('/data', dataRouter);
apiRouter.use('/group', groupRouter);
apiRouter.use('/license', licenseRouter);
apiRouter.use('/server', serverRouter);
apiRouter.use('/sheet', sheetRouter);
apiRouter.use('/user', userRouter);

export default apiRouter;