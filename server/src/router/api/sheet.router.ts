import { Router, Request, Response, NextFunction } from 'express';
import SheetManager from '../../service/impl/SheetManager';

const sheetRouter = Router();
const sheetManager = new SheetManager();

sheetRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

sheetRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await sheetManager.selectAll() );
});

sheetRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await sheetManager.select(parseInt(req.params.idx)) );
});

sheetRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await sheetManager.insert(req.body) );
});

sheetRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await sheetManager.update(req.body) );
});

sheetRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await sheetManager.delete(parseInt(req.params.idx)) );
});

export default sheetRouter;