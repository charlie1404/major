const jwt = require('jsonwebtoken');
const Users = require('mongoose').model('Users');
const {
  jwtSecret,
  jwtConfig,
  authIdParams,
  keepAliveParams,
} = require('@app/config');

// const { Users } = require('../../../models');
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

  const authId = process.env.LongTermJWT;
  // const authId = jwt.sign({
  //   iss: 'https://charlieweb.tk',
  //   aud: email,
  //   name: user.name,
  //   iat: Math.floor(Date.now() / 1000),
  // }, jwtSecret, jwtConfig);

  setTimeout(() => {
    res.status(200);
    res.cookie('authid', authId, authIdParams());
    res.cookie('keepalive', Date.now() + 7200000, keepAliveParams());
    res.end();
  }, 1000);
};

module.exports = login;
