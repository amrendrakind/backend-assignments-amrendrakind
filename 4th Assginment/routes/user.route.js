const express = require('express')
const router = express.Router()
const userOrAdmin = require('../middleware/userOrAdmin.js');
const jwtAuth = require('../middleware/jwtAuth.js')
const userControl = require('../controllers/user.controller')

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    })
    app.post('/createuser', userControl.register);
    app.post('/login/:name', userControl.login);
    app.get('/alluser/:name', jwtAuth,userOrAdmin,userControl.getAllUsers);

}
