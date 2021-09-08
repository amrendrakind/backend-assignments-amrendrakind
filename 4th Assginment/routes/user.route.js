// const express = require('express')
// const router = express.Router()
const userOrAdmin = require('../middleware/userOrAdmin.js');
const jwtAuth = require('../middleware/jwtAuth.js')
const {newUser, allUsers, userid, userTodo} = require('../controllers/user.controller.js')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/createuser',jwtAuth, newUser);
    router.get('/alluser',jwtAuth, allUsers);
    router.get('/userid/:id',jwtAuth,userOrAdmin, userid);
    router.get('/usertodo/:query',jwtAuth, userTodo);
}
// module.exports = router