const path = require('path');

const ENV_CONFIG = {
  production: {},
  development: {},
};

const COMMON_CONFIG = {
  LOGS_PATH: path.join(__dirname, '..', 'logs'),
};

let env = process.env.NODE_ENV || '';
if (!ENV_CONFIG[env]) {
  env = 'development';
}

module.exports = Object.assign({}, COMMON_CONFIG, ENV_CONFIG[env]);
