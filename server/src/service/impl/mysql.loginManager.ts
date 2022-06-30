import MysqlLoginManagerInterface from '../inf/mysql.loginManager.interface';
import mysqlConnection from '../../utils/mysqlConnection';
import user from '../../domain/user.mysql.interface';
import mysql from 'mysql';

class MysqlLoginManager implements MysqlLoginManagerInterface {

  private _connection: mysql.Connection;

  constructor() {
    this._connection = mysqlConnection;
  }

  login(id: string, password: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {

    });
  }
  checkDupId(id: string): Promise<string> {

    const sql: string = 'SELECT * FROM tb_user WHERE user_id = ?';
    const params: string[] = [ id ];

    return new Promise<string>((resolve, reject) => {
      this._connection.query(sql, params, (err, rows, fields) => {
        this._connection.end();

        if (rows.length) {
          resolve('DISALLOW');
        } else {
          resolve('ALLOW');
        }
      });
    });
  }


}

export default MysqlLoginManager;