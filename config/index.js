const path = require('path');

const {
  PUBLIC_KEY,
  PRIVATE_KEY,
  JWT_SECRET,
  NODE_ENV,
} = process.env;

const ENV_CONFIG = {
  production: {
    mongodbConfig: {
      poolSize: 10,
      useNewUrlParser: true,
    },
  },
  development: {
    mongodbConfig: {
      useCreateIndex: true,
      poolSize: 2,
      useNewUrlParser: true,
    },
  },
};

const COMMON_CONFIG = {
  LOGS_PATH: path.join(__dirname, '..', 'logs'),
  jwtPublicKey: Buffer.from(PUBLIC_KEY),
  jwtPrivateKey: Buffer.from(PRIVATE_KEY),
  jwtSecret: Buffer.from(JWT_SECRET),
  jwtConfig: {
    algorithm: 'HS256',
    expiresIn: 3600,
  },
};

let env = NODE_ENV || '';
if (!ENV_CONFIG[env]) {
  env = 'development';
}

module.exports = Object.assign({}, COMMON_CONFIG, ENV_CONFIG[env]);
