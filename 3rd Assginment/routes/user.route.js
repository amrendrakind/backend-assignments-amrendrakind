import express from "express";
const router = express.Router()

const app = express();
app.use(express.json());

import {newUser, allUsers, user} from "../controllers/user.controller.js";

router.post('/createuser', newUser);
router.get('/alluser', allUsers);
router.get('/user/:id',user);



export default router