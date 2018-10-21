const router = require('express').Router();

const usersRoute = require('./users');
const mailsRoute = require('./mails');

router.use(usersRoute);
router.use(mailsRoute);
// router.use('/profiles', require('./profiles'));
// router.use('/articles', require('./articles'));
// router.use('/tags', require('./tags'));

module.exports = router;
