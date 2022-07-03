import { sheet, sheetExt } from '../../domain/sheet.interface';

interface SheetManagerInterface {
  insert(sheet: sheet): Promise<number>;

  selectAll(): Promise<sheetExt[]>;

  select(seq: number): Promise<sheetExt>;

  update(props: {seq: number, sheet_nm: string, sheet_url: string}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default SheetManagerInterface;