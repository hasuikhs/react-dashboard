import { Router, Request, Response, NextFunction } from 'express';
import { UserManager } from '../../service/impl';

const userRouter = Router();
const userManager = new UserManager();

userRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

userRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await userManager.selectAll() );
});

userRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await userManager.select(parseInt(req.params.idx)) );
});

userRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await userManager.insert(req.body) );
});

userRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await userManager.update(req.body) );
});

userRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await userManager.delete(parseInt(req.params.idx)) );
});

export default userRouter;