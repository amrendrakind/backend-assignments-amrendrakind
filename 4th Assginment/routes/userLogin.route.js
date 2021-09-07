const express = require('express');
const router = express.Router();
const user = require("../controllers/userLogin.controller.js");
const checkAuth = require('../middleware/passportAuth.js')

router.get('/', checkAuth.checkAuthenticated, user.index);
router.get('/login', checkAuth.checNotkAuthenticated, user.login);
router.get('/register', checkAuth.checNotkAuthenticated, user.getRegister);
router.post('/register', checkAuth.checNotkAuthenticated, user.postRegister);
router.post('/login', checkAuth.checNotkAuthenticated, user.postLogin);
router.delete('/logout', user.logout)

module.exports = router;