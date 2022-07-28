interface license {
  seq?: number;
  licenseNm: string;
  licenseId: string;
  licensePw: string;
  isMain: number;
  groupSeq: string; // split(,) string
  regDt?: Date;
  updDt?: Date;
}

export default license;