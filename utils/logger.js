const path = require('path');
const morgan = require('morgan');
const rfs = require('rotating-file-stream');
const { createLogger, format, transports } = require('winston');

const { LOGS_PATH } = require('../config');

const Logger = (() => {
  const accessLogStream = rfs('access-combined.log', {
    size: '100M',
    interval: '1d',
    compress: 'gzip',
    path: LOGS_PATH,
  });
  const errorLogStream = rfs('access-error.log', {
    size: '30M',
    interval: '1d',
    compress: 'gzip',
    path: LOGS_PATH,
  });
  const logger = createLogger({
    transports: [
      new transports.File({
        format: format.combine(
          format.timestamp(),
          format.printf(info => `{timestamp: ${info.timestamp}, level:${info.level}, message: ${info.message}}`)
        ),
        level: 'info',
        filename: path.join(LOGS_PATH, 'general-logs.log'),
        handleExceptions: false,
        json: true,
        colorize: false,
      }),
    ],
    exceptionHandlers: [
      new transports.File({ filename: path.join(LOGS_PATH, 'exceptions.log') }),
    ],
    exitOnError: false,
  });

  if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
      format: format.combine(
        format.colorize(),
        format.simple()
      ),
      level: 'debug',
      handleExceptions: true,
      json: true,
      colorize: true,
    }));
  }

  const logsFormat = '{"status": :status, "method": ":method", "path": ":url", "http-version": "HTTP/:http-version", "referrer": ":referrer", "ip": ":remote-addr", "timestamp": ":date[iso]", "user-agent": ":user-agent", "content-length": :res[content-length], "response-time": :response-time, "headers": :headers}';

  morgan.token('headers', (req) => {
    const notAllowed = ['host', 'user-agent'];
    const filtered = Object.keys(req.headers)
      .filter(key => !notAllowed.includes(key))
      .reduce((obj, key) => Object.assign({}, obj, {
        [key]: req.headers[key],
      }), {});
    return JSON.stringify(filtered);
  });

  const infoLogger = () => morgan(logsFormat, {
    skip: (req, res) => res.statusCode >= 400,
    stream: accessLogStream,
  });
  const errorLogger = () => morgan(logsFormat, {
    skip: (req, res) => res.statusCode < 400,
    stream: errorLogStream,
  });
  const putLog = (level, msg) => {
    let message;
    if (msg instanceof Error) {
      message = JSON.stringify(msg, Object.getOwnPropertyNames(msg));
    } else {
      const cache = [];
      message = JSON.stringify(message, (key, value) => {
        if (typeof value === 'object' && value !== null) {
          if (cache.indexOf(value) !== -1) return null;
          cache.push(value);
        }
        return value;
      });
    }

    logger.log({ level, message });
  };

  return {
    infoLogger,
    errorLogger,
    putLog,
  };
})();

module.exports = Logger;
