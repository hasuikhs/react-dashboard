import MysqlLoginManagerInterface from '../inf/mysql.loginManager.interface';
import mysqlConnection from '../../utils/mysqlConnection';
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
  async checkDupId(id: string): Promise<string> {

    let sql: string = 'SELECT * FROM tb_user WHERE user_id = ?';
    let params: string[] = [ id ];

    return new Promise<string>((resolve, reject) => {
      this._connection.query(sql, params, (err, rows, fields) => {
        resolve(rows);
      });
    });
  }


}

export default MysqlLoginManager;