const path = require('path');

const ENV_CONFIG = {
  production: {},
  development: {},
};

const COMMON_CONFIG = {
  LOGS_PATH: path.join(__dirname, '..', 'logs'),
  database: {
    dbHost: process.env.DB_HOST || 'localhost',
    dbName: process.env.DB_NAME || '',
    dbUsername: process.env.DB_USERNAME || 'root',
    dbPassword: process.env.DB_PASSWORD || '',
    dbPort: process.env.DB_PORT || 3306,
  },
};

let env = process.env.NODE_ENV || '';
if (!ENV_CONFIG[env]) {
  env = 'development';
}

module.exports = Object.assign({}, COMMON_CONFIG, ENV_CONFIG[env]);
