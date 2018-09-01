const router = require('express').Router();

const signup = require('./signup');
const getUsers = require('./get-users');

router.get('/users', getUsers);
router.post('/user/signup', signup);

module.exports = router;
