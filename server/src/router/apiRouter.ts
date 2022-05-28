import { Router } from 'express';

import accountRouter from './api/account.router';
import docRouter from './api/doc.router';
import serverRouter from './api/server.router';

const apiRouter: Router = Router();

apiRouter.use('/account', accountRouter);
apiRouter.use('/doc', docRouter);
apiRouter.use('/server', serverRouter);

export default apiRouter;