const router = require('express').Router();

const usersRoute = require('./users');

router.use(usersRoute);

module.exports = router;
