import { Router } from 'express';

import testGraphql from './graphql/test';

const graphqlRouter: Router = Router();

graphqlRouter.use('/test', testGraphql);

export default graphqlRouter;