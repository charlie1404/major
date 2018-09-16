const jwt = require('jsonwebtoken');
const { jwtPublicKey } = require('../config');
const { putLog } = require('../utils');

const isAuthenticatedMiddleware = (req, res, next) => {
  try {
    const user = jwt.verify(req.headers.authorization, jwtPublicKey);
    req.client = user;
    next();
  } catch (error) {
    putLog('error', 'isAuthenticatedMiddleware', error);
    res.status(401);
    res.json({
      message: 'Invalid Request',
    });
  }
};

module.exports = isAuthenticatedMiddleware;
