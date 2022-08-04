import mysql from 'mysql';
import 'dotenv/config';

const mysqlConfig = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  connectionLimit: Number(process.env.DB_CONNECTION_LIMIT)
};

const pool: mysql.Pool = mysql.createPool(mysqlConfig);

export default pool;