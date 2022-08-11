import { Router, Request, Response, NextFunction } from 'express';
import GroupManager from '../../service/impl/GroupManager';

const groupRouter = Router();
const groupManager = new GroupManager();

groupRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

groupRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await groupManager.selectAll() );
});

groupRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await groupManager.select(parseInt(req.params.idx)) );
});

groupRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await groupManager.insert(req.body) );
});

groupRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await groupManager.update(req.body) );
});

// groupRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
//   return res.status(200).json( await groupManager.delete(parseInt(req.params.idx)) );
// });

export default groupRouter;