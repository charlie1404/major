const {
  DB,
} = require('../../utils');

const executeQuery = (...params) => new Promise((resolve, reject) => {
  DB
    .then((connection) => {
      connection.query(...params, async (err, res) => {
        if (err) {
          reject(err);
        }
        resolve(res);
      });
    });
});

module.exports = executeQuery;
