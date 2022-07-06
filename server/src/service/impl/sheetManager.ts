import SheetManagerInterface from '../inf/sheetManager.interface';
import sheet from '../../domain/sheet.interface';
import pool from '../../utils/mysqlConnection';

import mysql from 'mysql';

class SheetManager implements SheetManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(sheet: sheet): Promise<number> {
    const sql: string = `
      INSERT INTO tb_sheet(sheet_nm, sheet_url, reg_dt, upd_dt)
      VALUES (?, ?, NOW(), NOW())
    `;
    const params: string[] = [ sheet.sheetNm, sheet.sheetUrl ];

    return new Promise<number>((resolve, reject) => {
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

  public async selectAll(): Promise<sheet[]> {
    const sql: string = `
      SELECT *
      FROM tb_sheet
      ORDER BY seq DESC
    `;

    return new Promise<sheet[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`SheetManager selectAll error. cause: ${ err }`));

          const dataList: sheet[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                seq: row.seq,
                sheetNm: row.sheet_nm,
                sheetUrl: row.sheet_url,
                regDt: row.reg_dt,
                updDt: row.upd_dt
              });
            }
          }

          resolve(dataList);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async select(seq: number): Promise<sheet> {
    const sql: string = `
      SELECT *
      FROM tb_sheet
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<sheet | any>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SheetManager select error. cause: ${ err }`));

          result = result[0];

          resolve(result ? {
            seq: result.seq,
            sheetNm: result.sheet_nm,
            sheetUrl: result.sheet_url,
            regDt: result.reg_dt,
            updDt: result.upd_dt
          } : {});
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async update(props: { seq: number, sheetNm: string, sheetUrl: string }): Promise<number> {
    const sql = `
      UPDATE tb_sheet
      SET sheet_nm = ?, sheet_url = ?, upd_dt = NOW()
      WHERE seq = ?
    `;
    const params: (string | number)[] = [ props.sheetNm, props.sheetUrl, props.seq ];

    return new Promise<number>((resolve, reject) => {
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

    return new Promise<number>((resolve, reject) => {
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

export default SheetManager;