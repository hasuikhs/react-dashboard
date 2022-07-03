import SheetManagerInterface from '../inf/sheetManager.interface';
import { sheet, sheetExt } from '../../domain/sheet.interface';
import pool from '../../utils/mysqlConnection';

import mysql from 'mysql';

class SheetManager implements SheetManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(sheet: sheet): Promise<number> {
    const sql: string = `
      INSERT INTO tb_sheet(sheet_nm, sheet_url)
      VALUES (?, ?, NOW(), NOW())
    `;
    const params: string[] = [ sheet.sheet_nm, sheet.sheet_url ];

    return new Promise<number>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (connErr) reject(new Error(`SheetManager insert error. cause: ${ err }`));

          resolve(result.insertId);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async selectAll(): Promise<sheetExt[]> {
    const sql: string = `
      SELECT *
      FROM tb_sheet
      ORDER BY seq DESC
    `;

    return new Promise<sheetExt[]>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`SheetManager selectAll error. cause: ${ err }`));

          const dataList: sheetExt[] = [];
          for (const row of rows) {
            dataList.push({
              seq: row.seq,
              sheet_nm: row.sheet_nm,
              sheet_url: row.sheet_url,
              reg_dt: row.reg_dt,
              upd_dt: row.upd_dt
            });
          }

          resolve(dataList);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async select(seq: number): Promise<sheetExt> {
    const sql: string = `
      SELECT *
      FROM tb_sheet
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<sheetExt>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SheetManager select error. cause: ${ err }`));

          result = result[0];
          resolve({
            seq: result.seq,
            sheet_nm: result.sheet_nm,
            sheet_url: result.sheet_url,
            reg_dt: result.reg_dt,
            upd_dt: result.upd_dt
          });
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async update(props: { seq: number; sheet_nm: string; sheet_url: string; }): Promise<number> {
    const sql = `
      UPDATE tb_sheet
      SET sheet_nm = ?, sheet_url = ?, upd_dt = NOW()
      WHERE seq = ?
    `;
    const params: (string | number)[] = [ props.sheet_nm, props.sheet_url, props.seq ];

    return new Promise<number>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SheetManager update error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async delete(seq: number): Promise<number> {
    const sql: string = `
      DELETE FROM tb_sheet
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<number>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SheetManager delete error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }
}