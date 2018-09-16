const jwt = require('jsonwebtoken');
const {
  jwtPrivateKey,
  jwtConfig,
} = require('../../../config');

const { Users } = require('../../../models');

const signin = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne(email.toLowerCase(), password);

  if (!user) throw new Error('Something very strange happened');

  const accessToken = jwt.sign({
    iss: 'https://charlieweb.tk',
    aud: email,
    iat: Math.floor(Date.now() / 1000),
  }, jwtPrivateKey, jwtConfig);

  return res.status(200).json({
    accessToken,
  });
};

module.exports = signin;
