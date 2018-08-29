module.exports = {
  apps: [{
    name: 'Webmail API',
    script: './bin/www',
    watch: true,
    instances: 1,
    exec_mode: 'cluster',
    ignore_watch: ['node_modules/', 'logs/'],
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
