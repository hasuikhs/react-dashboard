import mysql from 'mysql';
require('dotenv').config();

const mysqlConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: process.env.DB_CONNECTION_LIMIT as number | undefined
};

const pool: mysql.Pool = mysql.createPool(mysqlConfig);

export default pool;