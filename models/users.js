const executeQuery = require('./helpers/execute-query');

const findOne = async (email) => {
  const sql = 'SELECT `email`, `salt`, `password` from users where email = ?';
  const [rs] = await executeQuery(sql, [email]);
  return rs;
};

module.exports = {
  findOne,
};
