const mysql = require('mysql');
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = require('../config');

let DB;
if (process.env.DB_SSH_TUNNELED) {
  DB = require('./tunneled-connection'); // eslint-disable-line global-require
} else {
  DB = new Promise((resolve, reject) => {
    const connection = mysql.createPool({
      connectionLimit: 10,
      host: DB_HOST,
      user: DB_USERNAME,
      port: DB_PORT,
      password: DB_PASSWORD,
      database: DB_NAME,
      waitForConnections: true,
      queueLimit: 0,
    });
    // connection.connect((err) => {
    //   if (err) reject(err);
    //   resolve(connection);
    // });
  });
}

module.exports = DB;
