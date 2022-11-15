import { DataManagerInterface } from '../inf';
import { data } from '../../domain';
import pool from '../../utils/mysqlConnection';

import mysql from 'mysql';
import { unixToDatetimeString } from '../../utils/common';
// --------------------------------------------------------------------------------

class DataManager implements DataManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(data: data[]): Promise<number> {
    const sql: string = `
      INSERT INTO tb_data(server_seq, cpu, mi01, mi05, mi15, mem, swap, total_disk, disk1, disk2, disk3, disk4, disk5, disk6)
      VALUES ?
    `;

    const values: number[][] = data.map((item: data) => ([
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
      item.disk3,
      item.disk4,
      item.disk5,
      item.disk6
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

  public async selectByServerSeq(serverSeq: number, psUnixtime: string): Promise<data[]> {
    const psDate = unixToDatetimeString(parseInt(psUnixtime));

    const sql: string = `
      SELECT *
      FROM tb_data
      WHERE server_seq = ?
      AND reg_dt >= ?
      ORDER BY reg_dt;
    `;
    const params: (number|string)[] = [ serverSeq, psDate ];

    return new Promise<data[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`DataManager selectByServerSeq error. cause: ${ err }`));

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
                disk4: row.disk4,
                disk5: row.disk5,
                disk6: row.disk6,
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

  public async selectByGroupSeq(groupSeq: number, psUnixtime: string): Promise<data[]> {
    const psDate = unixToDatetimeString(parseInt(psUnixtime));

    const sql: string = `
      SELECT d.*
      FROM tb_data d
      LEFT JOIN tb_server s
      ON d.server_seq = s.seq
      WHERE s.group_seq = ?
      AND d.reg_dt >= ?
      ORDER BY d.reg_dt;
    `;
    const params: (number|string)[] = [ groupSeq, psDate ];

    return new Promise<data[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`DataManager selectByGroupSeq error. cause: ${ err }`));

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
                disk4: row.disk4,
                disk5: row.disk5,
                disk6: row.disk6,
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

  public async selectAll(psUnixtime: string): Promise<data[]> {
    const psDate = unixToDatetimeString(parseInt(psUnixtime));

    const sql: string = `
      SELECT d.*
      FROM tb_data d
      LEFT JOIN tb_server s
      on d.server_seq = s.seq
      WHERE d.reg_dt >= ?
      ORDER BY d.reg_dt
    `;
    const params: string[] = [ psDate ];

    return new Promise<data[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`DataManager selectByGroupSeq error. cause: ${ err }`));

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
                disk4: row.disk4,
                disk5: row.disk5,
                disk6: row.disk6,
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
    // 일주일 이전 데이터 삭제
    const sql: string = `
      DELETE FROM tb_data
      WHERE reg_dt < DATE_ADD(NOW(), INTERVAL -6 DAY)
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

export default DataManager;