import express, { Request, Response, Express } from 'express';
import cluster from 'cluster';
import cors from 'cors';
import schedule from 'node-schedule';
import { apiRouter, jwtRouter, graphqlRouter } from './src/router';
import verifyToken from './src/utils/verifyToken';
import { DataManager } from './src/service/impl';
import { getSyncAllMonitoringData, selfMonitor } from './src/utils/dataUtil';
import { EventEmitter} from 'events';

const PORT: number = 3030;
const WORKER_SIZE: number = 1;

EventEmitter.setMaxListeners(30);

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
    const dataManager = new DataManager();

    schedule.scheduleJob('40 20/30 * * * *', async () => {
      console.log('---------------------------------');
      console.log('START -', new Date().toLocaleString());
      const data = await getSyncAllMonitoringData();
      const rows = await dataManager.insert(data);

      console.log(`INSERT ROWS ${ rows } OK.`)
      console.log('END ---', new Date().toLocaleString());
      console.log('---------------------------------');
    });

    // 매일 01:05:00
    schedule.scheduleJob('10 10 1 * * *', async () => {
      console.log('---------------------------------');
      console.log('START -', new Date().toLocaleString());
      const rows = await dataManager.delete();

      console.log(`DELETE ROWS ${ rows } OK.`)
      console.log('END ---', new Date().toLocaleString());
      console.log('---------------------------------');
    });

    schedule.scheduleJob('0 * * * * *', () => selfMonitor('./monitor.log'));

  });

  return app;
}