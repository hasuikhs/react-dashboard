import mysql from 'mysql';
require('dotenv').config();

const mysqlConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
};

const mysqlConnection: mysql.Connection = mysql.createConnection(mysqlConfig);
mysqlConnection.connect();

export default mysqlConnection;