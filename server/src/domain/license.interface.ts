interface license {
  seq?: number;
  licenseNm: string;
  licenseId: string;
  licensePw: string;
  groupSeq: string; // split(,) string
  groupNm?: string;
  regDt?: Date;
  updDt?: Date;
}

export default license;