import server from '../../domain/server.interface';

interface ServerManagerInterface {
  insert(server: server): Promise<number>;

  selectAll(): Promise<server[]>;

  selectAllByGroupSeq(groupSeq: number): Promise<server[]>;

  select(seq: number): Promise<server>;

  update(props: { seq: number, serverNm: string, cpuCnt: number, ram: number, disk: number, os: string, isActive: string, groupSeq: number}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default ServerManagerInterface;