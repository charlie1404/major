const executeQuery = require('./helpers/execute-query');

const sendMail = async () => {
  // const sql = 'SELECT `name`, `email`, `salt`, `password` from `users` where email = ?';
  // const [rs] = await executeQuery(sql, [email]);
  // if (!rs) throw INVALID_CREDENTIALS;
  // const hashedPassword = await getHash(password, rs.salt);

  // if (hashedPassword !== rs.password) {
  //   throw INVALID_CREDENTIALS;
  // }

  // return rs;
};

const listAll = async (email) => {
  const sql = `select mid, date, message_id, subject, body, read_status, fromEmail from message where receiver = '${email}' order by mid desc;`;
  const rs = await executeQuery(sql);

  // const rs = await new Promise((resolve) => {
  //   setTimeout(() => {
  //     resolve(require('./temp.json'));
  //   }, 1000);
  // });
  return rs;
};

module.exports = {
  sendMail,
  listAll,
};
