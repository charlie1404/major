const putLog = require('./put-log');

const asyncErrorHandler = fn => (req, res, next) => {
  fn(req, res, next)
    .catch((err) => {
      if (err instanceof Error) {
        putLog('error', null, err);
      } else {
        putLog('error', err.action, err);
      }
      res.status(err.status || 500);
      res.json({
        message: err.message || 'There was some internal server error.',
      });
    });
};

module.exports = asyncErrorHandler;
