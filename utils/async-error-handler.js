const Logger = require('./logger');

const asyncMiddleware = fn => (req, res, next) => {
  fn(req, res, next)
    .catch((err) => {
      if (err instanceof Error) {
        Logger.putLog('error', null, err);
      } else {
        Logger.putLog('error', err.action, err);
      }
      res.status(err.status || 500);
      res.json({
        message: err.message || 'There was some internal server error.',
      });
    });
};

module.exports = asyncMiddleware;
