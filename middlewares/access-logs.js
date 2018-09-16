const morgan = require('morgan');
const debugMorgan = require('debug')('morgan');
const rfs = require('rotating-file-stream');

const { LOGS_PATH } = require('../config');

const isProduction = process.env.NODE_ENV === 'production';

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
  stream: !isProduction ? { write: msg => debugMorgan(msg) } : rfs('access-combined.log', {
    size: '100M',
    interval: '1d',
    compress: 'gzip',
    path: LOGS_PATH,
  }),
});
const errorLogger = () => morgan(logsFormat, {
  skip: (req, res) => res.statusCode < 400,
  stream: !isProduction ? { write: msg => debugMorgan(msg) } : rfs('access-error.log', {
    size: '30M',
    interval: '1d',
    compress: 'gzip',
    path: LOGS_PATH,
  }),
});

module.exports = {
  infoLogger,
  errorLogger,
};
