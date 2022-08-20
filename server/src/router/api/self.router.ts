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

  const ip: string = os.networkInterfaces().en0?.[1].address || '';
  const cpu: number = os.cpus().length;
  const mem: number = Math.round(os.totalmem() / UNIT_MB * 1_000) / 1_000;
  const disk: number = Math.round(checkedDisk.size / UNIT_MB * 1_000) / 1_000;

  return res.status(200).json({ ip, cpu, mem, disk });
});

selfRouter.get('/status-real', async (req: Request, res: Response) => {

  const checkedDisk = await checkDiskSpace('/');

  const totalMem: number = Math.round(os.totalmem() / UNIT_MB * 1_000) / 1_000;
  const freeMem: number = Math.round(os.freemem() / UNIT_MB * 1_000) / 1_000;
  const usedMem: number = totalMem - freeMem;

  const totalDisk: number = Math.round(checkedDisk.size / UNIT_MB * 1_000) / 1_000;
  const freeDisk: number = Math.round(checkedDisk.free / UNIT_MB * 1_000) / 1_000;
  const usedDisk: number = totalDisk - freeDisk;

  return res.status(200).json({ mem: { usedMem, freeMem }, disk: { usedDisk, freeDisk } });
});

selfRouter.get('/status', async (req: Request, res: Response) => {

  let hour: number = parseInt(req.query.beforeHours as string);

  let ps: string = unixToDatetimeString(new Date(Date.now() - hour * 60 * 60 * 1_000).getTime());
  let pe: string = unixToDatetimeString(new Date().getTime());

  return res.status(200).json( await selfManager.selectPeriod(ps, pe) );
});

export default selfRouter;