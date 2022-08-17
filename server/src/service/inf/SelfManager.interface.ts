import { selfMonitor } from '../../domain';

interface SelfManagerInterface {
  insertOne(): Promise<number>;

  selectPeriod(ps: string, pe: string): Promise<selfMonitor[]>;

  delete(): Promise<number>;
}

export default SelfManagerInterface;