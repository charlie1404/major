const router = require('express').Router();
const apiRoutes = require('./api');

router.use('/api', apiRoutes);

router.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  err.message = 'Not Found';
  next(err);
});

router.use((err, req, res) => {
  res.status(err.status || 500);
  res.json({
    message: err.message || 'Server Error Encountered',
    stack: err.stack,
  });
});

module.exports = router;
