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

  public async insert(user: user): Promise<string> {

    user.user_pw = encodePassword(user.user_pw);

    const sql = `
      INSERT INTO tb_user(user_nm, user_id, user_pw, login_dt, reg_dt, upd_dt)
      VALUES (?, ?, ?, NOW(), NOW(), NOW())
    `
    const params: string[] = [ user.user_nm, user.user_id, user.user_pw ];

    return new Promise<string>(async (resolve, reject) => {
      const loginManager = new LoginManager();
      const checkDupResult = await loginManager.checkDupId(user.user_id);

      if (checkDupResult === 'DISALLOW') {
        resolve('FAIL')
      }

      this._conn.getConnection((connErr, conn) => {
        if (connErr) reject(new Error(`connection pool error. cause: ${ connErr }`));

        conn.query(sql, params, (err, rows) => {
          if (err) reject(new Error(`UserManager insert error. cause: ${ err }`));

          resolve('SUCCESS')
        });

        // return connection pool
        conn.release();
      });
    });
  }
}

export default UserManager;