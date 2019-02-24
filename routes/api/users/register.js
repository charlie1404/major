const { Users } = require('@app/models');
const { getHash } = require('../../../utils');

const register = async (req, res) => {
  const isUser = await Users.findOne({ where: { email: req.body.email }, attributes: ['id'] });
  if (isUser) {
    const err = new Error('User Already Exists');
    err.status = 400;
    throw err;
  }

  const { hash, salt } = await getHash(req.body.password);

  const user = Users.build({
    name: req.body.name,
    email: req.body.email.toLowerCase(),
    username: req.body.username.toLowerCase(),
    contact: req.body.contact,
    salt,
    password: hash,
    gender: req.body.gender,
    avatar: req.body.avatar,
  });

  await user.save();

  res.status(200);
  res.end();
};

module.exports = register;
