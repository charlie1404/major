const { Users } = require('@models');

const register = async (req, res) => {
  const user = new Users({
    username: req.body.username,
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    contact: req.body.contact,
    gender: req.body.gender,
    avatar: req.body.avatar,
  });

  await user.save();

  res.status(200);
  res.end();
};

module.exports = register;
