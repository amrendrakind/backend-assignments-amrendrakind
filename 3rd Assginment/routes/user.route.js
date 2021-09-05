import express from "express";
const router = express.Router()

const app = express();
app.use(express.json());

import {newUser, allUsers, userid} from "../controllers/user.controller.js";

router.post('/createuser', newUser);
router.get('/alluser', allUsers);
router.get('/userid/:id',userid);
router.get('/userid/:id',userid);


export default router