interface user {
  user_nm: string;
  user_id: string;
  user_pw: string;
}

interface userExt extends user {
  seq: number;
  login_dt: Date;
  reg_dt: Date;
  upd_dt: Date;
}

export { user, userExt };