const isAuthenticatedMiddleware = require('./authenticated');
const { infoLogger, errorLogger } = require('./access-logs');

module.exports = {
  infoLogger,
  errorLogger,
  isAuthenticatedMiddleware,
};
