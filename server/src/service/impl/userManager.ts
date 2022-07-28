import UserManagerInterface from '../inf/userManager.interface';
import user from '../../domain/user.interface';
import pool from '../../utils/mysqlConnection';
import { encodePassword  } from '../../utils/passwordUtil';
import LoginManager from './loginManager';

import mysql from 'mysql';

class UserManager implements UserManagerInterface {

  private _conn: mysql.Pool;

  constructor() {
    this._conn = pool;
  }

  public async insert(user: user): Promise<number> {

    user.userPw = encodePassword(user.userPw || '');

    const sql: string = `
      INSERT INTO tb_user(user_nm, user_id, user_pw, login_dt, reg_dt, upd_dt)
      VALUES (?, ?, ?, NOW(), NOW(), NOW())
    `;
    const params: string[] = [ user.userNm, user.userId, user.userPw ];

    return new Promise<number>(async (resolve, reject) => {
      const loginManager = new LoginManager();
      const checkDupResult = await loginManager.checkDupId(user.userId);

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

  public async selectAll(): Promise<user[]> {
    const sql: string = `
      SELECT *
      FROM tb_user
      WHERE is_admin != 'Y'
      ORDER BY seq DESC
    `;
    
    return new Promise<user[]>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, (err, rows) => {
          if (err) reject(new Error(`UserManager selectAll error. cause: ${ err }`));

          const dataList: user[] = [];
          if (rows.length) {
            for (const row of rows) {
              dataList.push({
                seq: row.seq,
                userNm: row.user_nm,
                userId: row.user_id,
                loginDt: row.login_dt,
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

  public async select(seq: number): Promise<user> {
    const sql: string = `
      SELECT *
      FROM tb_user
      WHERE seq = ?
      AND is_admin != 1
    `;
    const params: number[] = [ seq ];

    return new Promise<user | any>((resolve, reject) => {
      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`Connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, result) => {
          if (err) reject(new Error(`UserManager select error. cause: ${ err }`));

          result = result[0];

          resolve(result ? {
            seq: result.seq,
            userNm: result.user_nm,
            userId: result.user_id,
            loginDt: result.login_dt,
            regDt: result.reg_dt,
            updDt: result.upd_dt
          } : {});
        });

        // return connection pool
        conn.release();
      });
    });
  }

  public async update(props: {seq: number, userNm: string, userPw?: string}): Promise<number> {
    const sql: string = `
      UPDATE tb_user
      SET user_nm = ?, ${ props.userPw ? `user_pw = ?,` : '' } upd_dt = NOW()
      WHERE seq = ?
    `;
    
    let params: (string | number)[];
    if (props.userPw) {
      props.userPw = encodePassword(props.userPw);
      
      params = [ props.userNm, props.userPw, props.seq ];
    } else {
      params = [ props.userNm, props.seq ];
    }

    return new Promise<number>((resolve, reject) => {
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

    return new Promise<number>((resolve, reject) => {
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