import { Router, Request, Response, NextFunction } from 'express';
import LicenseManager from '../../service/impl/LicenseManager';

const licenseRouter = Router();
const licenseManager = new LicenseManager();

licenseRouter.use((req: Request, res: Response, next: NextFunction) => {
  next();
});

licenseRouter.get('/', async (req: Request, res: Response) => {
  return res.status(200).json( await licenseManager.selectAll() );
});

licenseRouter.get('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await licenseManager.select(parseInt(req.params.idx)) );
});

licenseRouter.post('/', async (req: Request, res: Response) => {
  return res.status(200).json( await licenseManager.insert(req.body) );
});

licenseRouter.put('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await licenseManager.update(req.body) );
});

licenseRouter.delete('/:idx([0-9]+)', async (req: Request, res: Response) => {
  return res.status(200).json( await licenseManager.delete(parseInt(req.params.idx)) );
});

export default licenseRouter;