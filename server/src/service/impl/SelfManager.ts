import { SelfManagerInterface } from '../inf';
import { selfMonitor } from '../../domain';
import pool from '../../utils/mysqlConnection';

import mysql from 'mysql';
import os from 'os';
import checkDiskSpace from 'check-disk-space';

const UNIT_MB: number = 1024 * 1024;

class SelfManager implements SelfManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insertOne(): Promise<number> {

    let [mi01, mi05, mi15]: number[] = os.loadavg();
    mi01 = Math.round(mi01 * 1_000) / 1_000;
    mi05 = Math.round(mi05 * 1_000) / 1_000;
    mi15 = Math.round(mi15 * 1_000) / 1_000;

    let usedMem: number = Math.round((os.totalmem() - os.freemem()) / UNIT_MB * 1_000) / 1_000;
    let checkedDisk = await checkDiskSpace('/');

    let usedDisk = Math.round((checkedDisk.size - checkedDisk.free) / UNIT_MB * 1_000) / 1_000;

    const sql: string = `
      INSERT INTO tb_self(mi01, mi05, mi15, used_mem, used_disk)
      VALUES (?, ?, ?, ?, ?)
    `;

    const params: number[] = [ mi01, mi05, mi15, usedMem, usedDisk ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SelfManager insert error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public selectPeriod(ps: string, pe: string): Promise<selfMonitor[]> {
    const sql: string = `
      SELECT *
      FROM tb_self
      WHERE reg_dt BETWEEN ? AND ?
      ORDER BY seq;
    `;
    const params: string[] = [ ps, pe ];

    return new Promise<selfMonitor[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`SelfManager selectPeriod error. cause: ${ err }`));

          const dataList: selfMonitor[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                mi01: row.mi01,
                mi05: row.mi05,
                mi15: row.mi15,
                usedMem: row.used_mem,
                usedDisk: row.used_disk,
                regDt: row.reg_dt
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

  public async delete(): Promise<number> {
    // 하루 이전 데이터 삭제
    const sql: string = `
      DELETE FROM tb_self
      WHERE reg_dt < DATE_ADD(NOW(), INTERVAL -2 DAY)
    `;

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) new Error(`Connection pool error. cause: ${ connErr }`);

        conn.query(sql, (err, result) => {
          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

}

export default SelfManager;