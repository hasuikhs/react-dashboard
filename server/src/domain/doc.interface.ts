interface doc {
  title: string;
  url: string;
}

interface docExt extends doc {
  idx?: number;
  regDt?: string;
  updDt: string;
}

export { doc, docExt };