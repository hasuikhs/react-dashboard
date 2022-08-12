import { license } from '../../domain';

interface LicenseManagerInterface {
  insert(license: license): Promise<number>;

  selectAll(): Promise<license[]>;

  select(seq: number): Promise<license>;

  update(props: { seq: number, licenseNm: string, licenseId: string, licensePw: string, loginUrl: string, groupSeq: string }): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default LicenseManagerInterface;