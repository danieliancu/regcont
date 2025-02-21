// lib/db.js
import mysql from 'mysql2';

const pool = mysql.createPool({
  host: 'bff34fepevfbzymmznsy-mysql.services.clever-cloud.com',
  user: 'ueosdl3zirpu30xu',
  password: 'h2rcp0ovX2jsOok3gcCK',
  database: 'bff34fepevfbzymmznsy',
  port: 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
}).promise();

export default pool;
