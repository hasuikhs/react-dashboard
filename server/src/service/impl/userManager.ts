import UserManagerInterface from '../inf/userManager.interface';
import { user, userExt } from '../../domain/user.mysql.interface';
import pool from '../../utils/mysqlConnection';
import { encodePassword  } from '../../utils/passwordUtil';
import LoginManager from './loginManager';

import { dateToStringFormat } from '../../utils/common';
import mysql from 'mysql';

class UserManager implements UserManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(user: user): Promise<number> {

    user.user_pw = encodePassword(user.user_pw || '');

    const sql: string = `
      INSERT INTO tb_user(user_nm, user_id, user_pw, login_dt, reg_dt, upd_dt)
      VALUES (?, ?, ?, NOW(), NOW(), NOW())
    `;
    const params: string[] = [ user.user_nm, user.user_id, user.user_pw ];

    return new Promise<number>(async (resolve, reject) => {
      const loginManager = new LoginManager();
      const checkDupResult = await loginManager.checkDupId(user.user_id);

      if (checkDupResult === 'DISALLOW') {
        resolve(0);
      }

      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`UserManager insert error. cause: ${ err }`));

          resolve(result.insertId);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async selectAll(): Promise<userExt[]> {
    const sql: string = `
      SELECT *
      FROM tb_user
      AND is_admin != 'Y'
    `;
    
    return new Promise<userExt[]>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`UserManager selectAll error. cause: ${ err }`));

          const dataList: userExt[] = [];
          for (const row of rows) {
            dataList.push({
              seq: row.seq,
              user_nm: row.user_nm,
              user_id: row.user_id,
              login_dt: row.login_dt,
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

  public async select(seq: number): Promise<userExt> {
    const sql: string = `
      SELECT *
      FROM tb_user
      WHERE seq = ?
      AND is_admin != 'Y'
    `;
    const params: number[] = [ seq ];

    return new Promise<userExt>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`UserManager select error. cause: ${ err }`));

          result = result[0];
          resolve({
            seq: result.seq,
            user_nm: result.user_nm,
            user_id: result.user_id,
            login_dt: result.login_dt,
            reg_dt: result.reg_dt,
            upd_dt: result.upd_dt
          });
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async update(props: {seq: number, user_nm: string, user_pw?: string}): Promise<number> {
    const sql = `
      UPDATE tb_user
      SET user_nm = ?, ${ props.user_pw ? `user_pw = ?,` : '' } upd_dt = NOW()
      WHERE seq = ?
    `;
    
    let params: (string | number)[];
    if (props.user_pw) {
      props.user_pw = encodePassword(props.user_pw);
      
      params = [ props.user_nm, props.user_pw, props.seq ];
    } else {
      params = [ props.user_nm, props.seq ];
    }

    return new Promise<number>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`UserManager update error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async delete(seq: number): Promise<number> {
    const sql: string = `
      DELETE FROM tb_user
      WHERE seq = ?
    `;
    const params: number[] = [ seq ];

    return new Promise<number>(async (resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`UserManager delete error. cause: ${ err }`));

          resolve(result.affectedRows);
        });

        // return connection pool
        conn.release();
      });
    });
  }
}

export default UserManager;