const router = require('express').Router();
const { isAuthenticatedMiddleware } = require('../../../middlewares');
const { asyncErrorHandler } = require('../../../utils');

const signup = require('./signup');
const signin = require('./signin');
const getUsers = require('./get-users');

router.get('/users', isAuthenticatedMiddleware, asyncErrorHandler(getUsers));
router.post('/user/signup', asyncErrorHandler(signup));
router.post('/user/signin', asyncErrorHandler(signin));

module.exports = router;
