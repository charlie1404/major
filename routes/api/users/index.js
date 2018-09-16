const router = require('express').Router();

const signup = require('./signup');
const signin = require('./signin');
const getUsers = require('./get-users');

router.get('/users', getUsers);
router.post('/user/signup', signup);
router.post('/user/signin', signin);

module.exports = router;
