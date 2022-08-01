interface server {
  seq?: number;
  serverNm: string;
  serverId: string;
  cpuCnt: number;
  ram: number;
  disk1: number;
  disk2: number;
  os: string;
  isActive?: number;
  groupSeq: number;
  groupNm?: string;
  regDt?: Date;
  updDt?: Date;
}

export default server;