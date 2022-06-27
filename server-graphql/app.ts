import express, { Request, Response, Express } from 'express';
import cluster from 'cluster';
import cors from 'cors';
import schedule from 'node-schedule';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';

const PORT: number = 3333;
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

  let schema = buildSchema(`
    type Query {
      hello: String
    }
  `);

  let root = {
    hello: () => {
      return 'Hello World';
    }
  }

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  }));

  app.get('*', (req: Request, res: Response) => {
    res.status(404).json({ message: 'error' });
  });

  app.listen(PORT, () => {
    console.log(`Express server listening on port ${ PORT } and worker ${ process.pid }`);

    schedule.scheduleJob('*/1 * * * *', () => {
      console.log(new Date());
    });
  });

  return app;
}