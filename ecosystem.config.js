module.exports = {
  apps: [{
    name: 'Webmail API',
    script: './bin/www',
    instances: 'max',
    exec_mode: 'cluster',
    error_file: './logs/consoleError.log',
    out_file: './logs/consoleLog.log',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
