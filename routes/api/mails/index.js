const router = require('express').Router();
const { isAuthenticatedMiddleware } = require('../../../middlewares');
const { asyncErrorHandler } = require('../../../utils');

const send = require('./send');
const getMails = require('./get-mails');

router.get('/mails', isAuthenticatedMiddleware, asyncErrorHandler(getMails));
router.post('/mail/send', isAuthenticatedMiddleware, asyncErrorHandler(send));

module.exports = router;
