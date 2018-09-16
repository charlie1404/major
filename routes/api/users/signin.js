const jwt = require('jsonwebtoken');
const {
  jwtPrivateKey,
  jwtConfig,
} = require('../../../config');
const { asyncMiddleware } = require('../../../utils');
const { Users } = require('../../../models');

const signin = asyncMiddleware(async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne(email.toLowerCase());
  console.log(user);

  const currentTime = Math.floor(Date.now() / 1000);

  const accessToken = jwt.sign({
    iss: 'https://charlieweb.tk',
    aud: email,
    iat: currentTime,
  },
  jwtPrivateKey,
  jwtConfig);

  return res.status(200).json({
    accessToken,
  });
});

module.exports = signin;
