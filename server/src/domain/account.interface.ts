interface account {
  id: string;
  password: string;
  group: string[];
  regDt: Date;
  updDt: Date;
}

interface accountExt extends account {
  idx: number;
}

export { account, accountExt };