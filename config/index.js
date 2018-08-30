const path = require('path');

const ENV_CONFIG = {
  production: {},
  development: {},
};

const COMMON_CONFIG = {
  LOGS_PATH: path.join(__dirname, '..', 'logs'),
  DB_HOST: process.env.DB_HOST || 'localhost',
  DB_NAME: process.env.DB_NAME || '',
  DB_USERNAME: process.env.DB_USERNAME || 'root',
  DB_PASSWORD: process.env.DB_PASSWORD || '',
  DB_PORT: process.env.DB_PORT || 3306,
};

let env = process.env.NODE_ENV || '';
if (!ENV_CONFIG[env]) {
  env = 'development';
}

module.exports = Object.assign({}, COMMON_CONFIG, ENV_CONFIG[env]);
