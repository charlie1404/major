const jwt = require('jsonwebtoken');
const {
  jwtSecret,
  jwtConfig,
} = require('../../../config');

const { Users } = require('../../../models');
const { getHash } = require('../../../utils');


const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await Users.findOne({
    email: email.toLowerCase(),
  });

  const err = new Error('Invalid Credentials');
  err.status = 400;

  if (!user) {
    throw err;
  }

  const { hash: derivedPassword } = await getHash(password, user.salt);

  if (derivedPassword === user.password) {
    throw err;
  }

  const token = jwt.sign({
    iss: 'https://charlieweb.tk',
    aud: email,
    name: user.name,
    iat: Math.floor(Date.now() / 1000),
  }, jwtSecret, jwtConfig);

  res.status(200);
  res.cookie('sessionid', token, { httpOnly: true });
  res.end();
  // res.json({ token });
};

module.exports = login;
