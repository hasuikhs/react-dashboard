import { Router, Request, Response, NextFunction } from 'express';
import { SelfManager } from '../../service/impl';

import os from 'os';
import checkDiskSpace from 'check-disk-space';
import { unixToDatetimeString } from '../../utils/common';

const selfRouter = Router();
const selfManager = new SelfManager();

const UNIT_MB: number = 1024 * 1024;

selfRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

// 서버의 스팩을 반환
selfRouter.get('/spec', async (req: Request, res: Response) => {

  const checkedDisk = await checkDiskSpace('/');

  const cpu: number = os.cpus().length;
  const mem: number = Math.round(os.totalmem() / UNIT_MB * 1_000) / 1_000;
  const disk: number = Math.round(checkedDisk.size / UNIT_MB * 1_000) / 1_000;

  return res.status(200).json({ cpu, mem, disk });
});

selfRouter.get('/status-real', async (req: Request, res: Response) => {

  const checkedDisk = await checkDiskSpace('/');

});

selfRouter.get('/status', async (req: Request, res: Response) => {

  let hour: number = parseInt(req.query.beforeHours as string);

  let ps: string = unixToDatetimeString(new Date(Date.now() - hour * 60 * 60 * 1_000).getTime());
  let pe: string = unixToDatetimeString(new Date().getTime());

  return res.status(200).json( await selfManager.selectPeriod(ps, pe) );
});

export default selfRouter;