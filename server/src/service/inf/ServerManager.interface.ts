import server from '../../domain/server.interface';

interface ServerManagerInterface {
  insert(server: server): Promise<number>;

  selectAll(): Promise<server[]>;

  selectAllByGroupSeq(groupSeq: number): Promise<server[]>;

  select(seq: number): Promise<server>;

  update(props: { seq: number, serverNm?: string, serverId?:string, cpuCnt?: number, ram?: number, disk1?: number, disk2?: number, os?: string, isActive?: number, groupSeq?: number}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default ServerManagerInterface;