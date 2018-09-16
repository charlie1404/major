const path = require('path');
const { createLogger, format, transports } = require('winston');
const { LOGS_PATH } = require('../config');

const consoleTransport = new transports.Console({
  format: format.combine(
    format.colorize(),
    format.simple()
  ),
  level: 'debug',
  handleExceptions: true,
  json: true,
  colorize: true,
});
const fileTransport = new transports.File({
  format: format.combine(
    format.timestamp(),
    format.printf(
      info => `{timestamp: ${info.timestamp}, level:${info.level}, message: ${info.message}}`
    )
  ),
  level: 'info',
  filename: path.join(LOGS_PATH, 'general-logs.log'),
  handleExceptions: false,
  json: true,
  colorize: false,
});
const exeptionFileTansport = new transports.File({
  filename: path.join(LOGS_PATH, 'exceptions.log'),
  level: 'silly',
});

const isProduction = process.env.NODE_ENV === 'production';
const logger = createLogger({ transports: [consoleTransport], exitOnError: false });

if (isProduction) {
  logger.remove(consoleTransport);
  logger.add(fileTransport);
  logger.exceptions.handle(exeptionFileTansport);
}

const putLog = (level, process, msg) => {
  let message;
  if (msg instanceof Error) {
    message = JSON.stringify(msg, Object.getOwnPropertyNames(msg));
  } else {
    const cache = [];
    message = JSON.stringify(msg, (key, value) => {
      if (typeof value === 'object' && value !== null) {
        if (cache.indexOf(value) !== -1) return null;
        cache.push(value);
      }
      return value;
    });
  }
  logger.log({ level, message });
};

module.exports = putLog;
