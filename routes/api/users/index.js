const router = require('express').Router();
const { isAuthenticatedMiddleware } = require('../../../middlewares');
const { asyncErrorHandler } = require('../../../utils');

const register = require('./register');
const login = require('./login');
const getUsers = require('./get-users');

router.get('/users', isAuthenticatedMiddleware, asyncErrorHandler(getUsers));
router.post('/user/register', asyncErrorHandler(register));
router.post('/user/login', asyncErrorHandler(login));

module.exports = router;
