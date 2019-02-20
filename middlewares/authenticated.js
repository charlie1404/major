const jwt = require('jsonwebtoken');
const {
  jwtSecret, authIdParams, jwtConfig, keepAliveParams,
} = require('@app/config');
const { putLog } = require('@app/utils');

const isAuthenticatedMiddleware = (req, res, next) => {
  try {
    const user = jwt.verify(req.cookies.authid, jwtSecret, { clockTolerance: 3600 });

    if ((user.exp * 1000) < (Date.now() + 2000)) {
      const authId = jwt.sign({
        iss: user.iss,
        aud: user.aud,
        name: user.name,
        iat: Math.floor(Date.now() / 1000),
      }, jwtSecret, jwtConfig);

      res.cookie('authid', authId, authIdParams());
      res.cookie('keepalive', Date.now() + 7200000, keepAliveParams());
    }

    req.client = user;
    next();
  } catch (error) {
    putLog('error', 'isAuthenticatedMiddleware', error);
    res.status(401);
    Object.keys(req.cookies).forEach(cookie => res.cookie(cookie, '', { expires: new Date(0) }));
    res.json({ message: 'Unauthorized Request' });
  }
};

module.exports = isAuthenticatedMiddleware;
