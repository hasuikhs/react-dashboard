import sheet from '../../domain/sheet.interface';

interface SheetManagerInterface {
  insert(sheet: sheet): Promise<number>;

  selectAll(): Promise<sheet[]>;

  select(seq: number): Promise<sheet>;

  update(props: {seq: number, sheetNm: string, sheetUrl: string}): Promise<number>;

  delete(seq: number): Promise<number>;
}

export default SheetManagerInterface;