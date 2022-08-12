import { data, license, server } from '../domain';
import pool from '../utils/mysqlConnection';
import getAllMonitoringData from '../utils/dataUtil';

import mysql from 'mysql';
import { CONNECTING } from 'ws';
// --------------------------------------------------------------------------------

class DataManager {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(data: data[]): Promise<number> {
    const sql: string = `
      INSERT INTO tb_data(server_seq, cpu, mi01, mi05, mi15, mem, swap, total_disk, disk1, disk2, disk3)
      VALUES ?
    `;

    const values: number[][] = data.map(item => ([
      item.serverSeq,
      item.cpu,
      item.mi01,
      item.mi05,
      item.mi15,
      item.mem,
      item.swap,
      item.totalDisk,
      item.disk1,
      item.disk2,
      item.disk3
    ]));

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, [ values ], (err, result) => {
          if (err) reject(new Error(`DataManager insert error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // retrun connection pool
        conn.release();
      });
    });
  }

  public async select(serverSeq: number): Promise<data[]> {
    const sql: string = `
      SELECT *
      FROM tb_data
      WHERE server_seq = ?
      ORDER BY reg_dt;
    `;
    const params: number[] = [ serverSeq ];

    return new Promise<data[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`DataManager select error. cause: ${ err }`));

          const dataList: data[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                serverSeq: row.server_seq,
                cpu: row.cpu,
                mi01: row.mi01,
                mi05: row.mi05,
                mi15: row.mi15,
                mem: row.mem,
                swap: row.swap,
                totalDisk: row.total_disk,
                disk1: row.disk1,
                disk2: row.disk2,
                disk3: row.disk3,
                regDt: row.reg_dt
              });
            }
          }

          resolve(dataList);
        });

        // return connecion pool
        conn.release();
      });
    });
  }

  public async delete(): Promise<void> {
    // 일주일 이전 데이터 삭제
    const sql: string = `
      DELETE FROM tb_data
      WHERE reg_dt < DATE_ADD(NOW(), INTERVAL -6 DAY)
    `;

    this._conn.getConnection((connErr, conn) => {
      if (connErr) new Error(`Connection pool error. cause: ${ connErr }`);

      conn.query(sql);
      this._conn.end();
      conn.release();
    });

  }
}

export default DataManager;