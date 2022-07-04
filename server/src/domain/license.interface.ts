interface license {
  seq?: number;
  licenseNm: string;
  licenseId: string;
  licensePw: string;
  isMain: string;
  groupSeq: string; // split(,) string
  regDt?: Date;
  updDt?: Date;
}

export default license;