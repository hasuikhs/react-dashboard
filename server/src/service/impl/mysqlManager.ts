import mysql from 'mysql';
import test from '../../domain/test.interface';
import MysqlManagerInterface from '../inf/mysqlManager.interface';
require('dotenv').config();

class MysqlManager implements MysqlManagerInterface {

  private _connection: mysql.Connection;

  constructor() {
    this._connection = mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE
    });
  }

  connect() {
    this._connection.connect()
  }

  insert(test: test): test {
    throw new Error('Method not implemented.');
  }

  async selectAll() {
    return new Promise<any>(async (resolve, reject) => {
      this._connection.query('SELECT * FROM test', (error, rows, fields) => {
        console.log('tter', rows)
        resolve(rows);
      });
    });
  }

}

export default MysqlManager;