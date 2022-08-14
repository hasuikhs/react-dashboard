import { Router, Request, Response, NextFunction } from 'express';
import DataManager from '../../service/impl/DataManager';

const dataRouter = Router();
const dataManager = new DataManager();

dataRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// server_seq를 받아서 가져오는 정보
dataRouter.get('/server/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await dataManager.selectByServerSeq(parseInt(req.params.idx), req.query.ps as string) );
});

// group_seq를 받아서 가져오는 정보
dataRouter.get('/group/:dix([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await dataManager.selectByGroupSeq(parseInt(req.params.idx), req.query.ps as string) );
});

export default dataRouter;