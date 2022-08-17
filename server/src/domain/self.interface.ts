interface selfMonitor {
  seq?: number;
  mi01: number;
  mi05: number;
  mi15: number;
  usedMem: number;
  usedDisk: number;
  regDt?: Date;
}

export default selfMonitor;