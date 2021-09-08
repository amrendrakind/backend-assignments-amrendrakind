import express from "express";
const router = express.Router()

const app = express();
app.use(express.json());

import {newUser, allUsers, userid, userTodo}  from "../controllers/user.controller.js";

router.post('/createuser', newUser);        // Create new User
router.get('/alluser', allUsers);           // List all users
router.get('/userid/:id',userid);           // List user by id

router.get('/usertodo/:query',userTodo);    //Searches todo list data by user name based on User Role.


export default router