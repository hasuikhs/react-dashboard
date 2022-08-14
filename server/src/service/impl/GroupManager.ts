import { GroupManagerInterface } from '../inf';
import { group } from '../../domain';
import pool from '../../utils/mysqlConnection';

import mysql from 'mysql';

class GroupManager implements GroupManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(group: group): Promise<number> {
    const sql: string = `
      INSERT INTO tb_group(group_nm, reg_dt, upd_dt)
      VALUES (?, NOW(), NOW())
    `;
    const params: string[] = [ group.groupNm ];

    return new Promise<number>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SheetManager insert error. cause: ${ err }`));

          resolve(result.insertId);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async selectAll(): Promise<group[]> {
    const sql: string = `
      SELECT *
      FROM tb_group
      ORDER BY seq DESC
    `;

    return new Promise<group[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`SheetManager selectAll error. cause: ${ err }`));

          const dataList: group[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                seq: row.seq,
                groupNm: row.group_nm,
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

  public async select(seq: number): Promise<group> {
    const sql: string = `
      SELECT *
      FROM tb_group
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<group | any>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`SheetManager select error. cause: ${ err }`));

          result = result[0];
          resolve(result ? {
            seq: result.seq,
            groupNm: result.group_nm,
            regDt: result.reg_dt,
            updDt: result.upd_dt
          } : {});
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async update(props: { seq: number, groupNm: string }): Promise<number> {
    const sql: string = `
      UPDATE tb_group
      SET group_nm = ?, upd_dt = NOW()
      WHERE seq = ?
    `;
    const params: (string | number)[] = [ props.groupNm, props.seq ];

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
      DELETE FROM tb_group
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return  new Promise<number>((resolve, reject) => {

      resolve(0);
      // 그룹 삭제는 추천하지 않음
      // this._conn.getConnection((connErr, conn) => {
      //   if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

      //   conn.query(sql, params, (err, result) => {
      //     if (err) reject(new Error(`GRoupManager delete error. cause: ${ err }`));

      //     resolve(result.affectedRows);
      //   });

      //   // return connection pool
      //   conn.release();
      // });
    });
  }

}

export default GroupManager;