const mysql = require('mysql');
const {
  DB_HOST,
  DB_PORT,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
} = require('../config');

const credentials = {
  host: DB_HOST,
  user: DB_USERNAME,
  port: DB_PORT,
  password: DB_PASSWORD,
  database: DB_NAME,
};
const poolConfig = {
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
};

let DB;
if (process.env.DB_SSH_TUNNELED) {
  DB = require('./tunneled-connection'); // eslint-disable-line global-require
} else {
  DB = new Promise((resolve, reject) => {
    const connection = mysql.createConnection(credentials);
    connection.connect((err) => {
      if (err) reject(err);
      resolve(mysql.createPool(Object.assign({}, credentials, poolConfig)));
    });
  });
}

module.exports = DB;
