const jwt = require('jsonwebtoken');
const {
  jwtPrivateKey,
  jwtConfig,
} = require('../../../config');

const { Users } = require('../../../models');

const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await Users.findOne(email.toLowerCase(), password);

  if (!user) throw new Error('Something very strange happened');

  const token = jwt.sign({
    iss: 'https://charlieweb.tk',
    aud: email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
  }, jwtPrivateKey, jwtConfig);

  res.status(200).json({
    token,
  });
};

module.exports = login;
