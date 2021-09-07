//import express from "express";
const express = require('express')
const router = express.Router()
const app = express();
app.use(express.json());
const {newUser, allUsers, userid, userTodo} = require('../controllers/user.controller.js')
//import {newUser, allUsers, userid, userTodo}  from "../controllers/user.controller.js";

router.post('/createuser', newUser);
router.get('/alluser', allUsers);
router.get('/userid/:id',userid);

router.get('/usertodo/:query',userTodo);


module.exports = router
//export default router