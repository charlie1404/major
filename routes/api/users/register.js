const { Users } = require('../../../models');
const { getHash } = require('../../../utils');

const register = async (req, res) => {
  const { hash, salt } = await getHash(req.body.password);
  const user = new Users({
    name: req.body.name,
    email: req.body.email,
    username: req.body.username,
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
