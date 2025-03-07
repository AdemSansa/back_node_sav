const express = require('express');

const { registerUser ,login} = require('./auth.controller');
const router = express.Router();



router.post('/register', registerUser);

router.post('/login', login);

//router for user growth


module.exports = router;
