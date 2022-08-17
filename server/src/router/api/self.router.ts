import { Router, Request, Response, NextFunction } from 'express';
import { SelfManager } from '../../service/impl';

import os from 'os';
import checkDiskSpace from 'check-disk-space';

const selfRouter = Router();
const selfManager = new SelfManager();

const UNIT_GB: number = 1024 * 1024 * 1024;

selfRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// 서버의 스팩을 반환
selfRouter.get('/spec', async (req: Request, res: Response) => {

  const checkedDisk = await checkDiskSpace('/');

  const cpu: number = os.cpus().length;
  const mem: number = Math.round(os.totalmem() / UNIT_GB * 1_000) / 1_000;
  const disk: number = Math.round(checkedDisk.size / UNIT_GB * 1_000) / 1_000;

  return res.status(200).json({ cpu, mem, disk});
});

selfRouter.get('/status', async (req: Request, res: Response) => {
  let ps: string = `${ req.query.ps } 00:00:00`;
  let pe: string = `${ req.query.pe } 23:59:59`;

  return res.status(200).json( await selfManager.selectPeriod(ps, pe) );
});

export default selfRouter;