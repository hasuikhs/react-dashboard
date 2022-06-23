import mysql from 'mysql';
import test from '../../domain/test.interface';
import MysqlManagerInterface from '../inf/mysqlManager.interface';
require('dotenv').config();

class MysqlManager implements MysqlManagerInterface {

  private _config = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
  }
  private _connection: mysql.Connection;

  constructor() {
    this._connection = mysql.createConnection(this._config);
    this._connection.connect();
  }

  insert(test: test): test {
    throw new Error('Method not implemented.');
  }

  selectAll(): Promise<test[]> {
    return new Promise((resolve, reject) => {
      this._connection.query('SELECT * FROM test', (error, result) => {
        this.disconnect();

        let dataList: test[] = [];

        for (let data of result) {
          dataList.push({
            id: data.id,
            password: data.password
          });
        }

        resolve(dataList);
      });
    });
  }

  private disconnect(): void {
      return this._connection.end();
  }

}


export default MysqlManager;