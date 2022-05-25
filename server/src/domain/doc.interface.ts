interface doc {
  title: string;
  url: string;
  regDt: Date;
  updDt: Date;
}

interface docExt extends doc {
  idx: number;
}

export { doc, docExt };