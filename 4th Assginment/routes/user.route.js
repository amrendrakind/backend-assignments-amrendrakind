const express = require('express')
const router = express.Router()
const checkAuth = require('../middleware/jwtAuth.js')
const {newUser, allUsers, userid, userTodo} = require('../controllers/user.controller.js')

router.post('/createuser',checkAuth, newUser);
router.get('/alluser',checkAuth, allUsers);
router.get('/userid/:id',checkAuth, userid);
router.get('/usertodo/:query',checkAuth, userTodo);

module.exports = router
