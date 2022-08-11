import { Router, Request, Response, NextFunction } from 'express';
import ServerManager from '../../service/impl/ServerManager';

const serverRouter = Router();
const serverManager = new ServerManager();

serverRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

serverRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await serverManager.selectAll() );
});

serverRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverManager.select(parseInt(req.params.idx)) );
});

serverRouter.get('/group/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverManager.selectAllByGroupSeq(parseInt(req.params.idx)) );
});

serverRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await serverManager.insert(req.body) );
});

serverRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverManager.update(req.body) );
});

serverRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await serverManager.delete(parseInt(req.params.idx)) );
});

export default serverRouter;