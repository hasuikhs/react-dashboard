interface license {
  seq?: number;
  licenseNm: string;
  licenseId: string;
  licensePw: string;
  loginUrl: string;
  groupSeq: string; // split(,) string
  regDt?: Date;
  updDt?: Date;
}

export default license;