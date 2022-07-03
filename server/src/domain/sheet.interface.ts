interface sheet {
  sheet_nm: string;
  sheet_url: string;
}

interface sheetExt extends sheet {
  seq: number;
  reg_dt: Date;
  upd_dt: Date;
}

export { sheet, sheetExt };