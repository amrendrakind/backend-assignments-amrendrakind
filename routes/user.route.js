import express from "express";
const router = express.Router()

const app = express();
app.use(express.json());

import newUser from "../controllers/user.controller.js";

router.post('/create_user', newUser);



export default router