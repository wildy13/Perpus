const { Router } = require('express');
const User = require('../user/model');
const setup = require('./passport');
const login = require('./controller');

setup(User);

const router = new Router();

// POST Router
router.post('/login', login);

module.exports = router;
