module.exports = {
  apps: [{
    name: 'Webmail API',
    script: './bin/www',
    watch: true,
    instances: 'max',
    exec_mode: 'cluster',
    ignore_watch: [
      '.git/**/*',
      'node_modules/**/*',
      'logs/**/*',
    ],
    error: './logs/consoleError.log',
    output: './logs/consoleLog.log',
    log_type: 'json',
    min_uptime: 5000,
    max_restarts: 1,
    wait_ready: true,
    merge_logs: true,
    env: {
      NODE_ENV: 'production',
    },
  }],
};
