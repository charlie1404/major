const path = require('path');

const {
  DB_HOST,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_PORT,
  PUBLIC_KEY,
  PRIVATE_KEY,
  NODE_ENV,
} = process.env;

const ENV_CONFIG = {
  production: {},
  development: {},
};

const COMMON_CONFIG = {
  LOGS_PATH: path.join(__dirname, '..', 'logs'),
  database: {
    dbHost: DB_HOST || 'localhost',
    dbName: DB_NAME || '',
    dbUsername: DB_USERNAME || 'root',
    dbPassword: DB_PASSWORD || '',
    dbPort: DB_PORT || 3306,
  },
  jwtPublicKey: Buffer.from(PUBLIC_KEY),
  jwtPrivateKey: Buffer.from(PRIVATE_KEY),
  jwtConfig: {
    algorithm: 'RS256',
    expiresIn: 3600,
  },
};

let env = NODE_ENV || '';
if (!ENV_CONFIG[env]) {
  env = 'development';
}

module.exports = Object.assign({}, COMMON_CONFIG, ENV_CONFIG[env]);
