const crypto = require('crypto');

// const { DB } = require('../../../utils');
// const { User } = require('../../../models');

const signup = (req, res, next) => {
  const salt = crypto.randomBytes(128).toString('base64');
  crypto.pbkdf2('secret', salt, 100000, 64, 'sha512', (err, derivedKey) => {
    if (err) {
      next(Object.assign(err, { status: 500 }));
    }
    console.log(derivedKey.toString('hex'));
  });
};

module.exports = signup;
