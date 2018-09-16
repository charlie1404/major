// const crypto = require('crypto');

const executeQuery = require('./helpers/execute-query');
const { INVALID_CREDENTIALS } = require('../constants/errors');
const { getHash } = require('../utils');

const findOne = async (email, password) => {
  const sql = 'SELECT `email`, `salt`, `password` from `users` where email = ?';
  const [rs] = await executeQuery(sql, [email]);
  if (!rs) throw INVALID_CREDENTIALS;
  const hashedPassword = await getHash(password, rs.salt);

  if (hashedPassword !== rs.password) {
    throw INVALID_CREDENTIALS;
  }

  return rs;
};

const listAll = async () => {
  const sql = 'SELECT `name`, `email`, `contact`, `gender`, `avatar` from `users`';
  const rs = await executeQuery(sql);
  return rs;
};

// const saveOne = async (name, email, password, contact, gender, avatar) => {
//   const salt = crypto.randomBytes(15).toString('base64');
//   const sql = 'INSERT INTO `users` SET ?';
//   const values = {
//     name,
//     email,
//     salt,
//     password: '',
//     contact,
//     gender,
//     avatar,
//   };
//   const rs = await executeQuery(sql, values);
// };

module.exports = {
  findOne,
  listAll,
  // saveOne,
};
