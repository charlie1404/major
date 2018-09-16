const mysql = require('mysql');
const {
  database: {
    dbHost,
    dbPort,
    dbName,
    dbUsername,
    dbPassword,
  },
} = require('../config');

const credentials = {
  host: dbHost,
  user: dbUsername,
  port: dbPort,
  password: dbPassword,
  database: dbName,
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
      const pool = mysql.createPool(Object.assign({}, credentials, poolConfig));
      resolve(pool);
    });
  });
}

module.exports = DB;
