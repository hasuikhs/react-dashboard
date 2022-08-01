import express, { Request, Response, Express } from 'express';
import cluster from 'cluster';
import cors from 'cors';
import schedule from 'node-schedule';
import apiRouter from './src/router/apiRouter';
import jwtRouter from './src/router/jwtRouter';
import graphqlRouter from './src/router/graphqlRouter';
import verifyToken from './src/utils/verifyToken';

const PORT: number = 3030;
const WORKER_SIZE: number = 1;

if (!cluster.isWorker) {
  for (let i = 0; i < WORKER_SIZE; i++) {
    cluster.fork();
  }

  cluster.on('exit', worker => {
    console.log(`Worker ${ worker.id } has exited.`);
  });
} else {
  runServer();
}

function runServer(): Express.Application {

  const app: Express = express();

  app.use(cors());
  // app.use(express.static('./'));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/token', jwtRouter);

  app.use('/api', verifyToken, apiRouter);

  app.use('/graphql', graphqlRouter);

  app.get('*', verifyToken, (req: Request, res: Response) => {
    res.status(404).json({ message: 'error' });
  });

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${ PORT } and worker ${ process.pid }`);

    schedule.scheduleJob('*/30 * * * *', () => {
      console.log(new Date().toString());
    });
  });

  return app;
}