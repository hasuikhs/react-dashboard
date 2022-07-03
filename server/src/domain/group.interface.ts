interface group {
  group_nm: string;
}

interface groupExt extends group {
  seq: number;
  reg_dt: Date;
  upd_dt: Date;
}

export { group, groupExt };