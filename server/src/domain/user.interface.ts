interface user {
  id: string;
  name: string;
  password: string;
  group: string[];
}

interface userExt extends user {
  idx?: number;
  regDt?: string;
  updDt: string;
}

export { user, userExt };