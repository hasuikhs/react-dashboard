interface account {
  id: string;
  name: string;
  password: string;
  group: string[];
}

interface accountExt extends account {
  idx?: number;
  regDt?: string;
  updDt: string;
}

export { account, accountExt };