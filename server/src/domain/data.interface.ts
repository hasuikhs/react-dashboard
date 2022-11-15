interface data {
  seq?: number;
  serverSeq: number;
  cpu: number;
  mi01: number;
  mi05: number;
  mi15: number;
  mem: number;
  swap: number;
  totalDisk: number;
  disk1: number;
  disk2: number;
  disk3: number;
  disk4: number;
  disk5: number;
  disk6: number;
  regDt?: Date;
}

export default data;