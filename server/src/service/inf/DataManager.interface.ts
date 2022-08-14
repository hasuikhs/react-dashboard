import { data } from '../../domain';

interface DataManagerInterface {
  insert(data: data[]): Promise<number>;

  selectByServerSeq(serverSeq: number, psUnixtime: string): Promise<data[]>;

  selectByGroupSeq(groupSeq: number, psUnixtime: string): Promise<data[]>;

  delete(): Promise<number>;
}

export default DataManagerInterface;