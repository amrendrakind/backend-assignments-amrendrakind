import express from "express";

const router = express.Router();
const app = express();
app.use(express.json());

import {
  createtodo,
  Alltodo,
  todo,
  updatetodo,
  deletetodo,
} from "../controllers/todo.controller.js";

router.post("/add", createtodo);          //Add todos
router.get("/alltodos", Alltodo);         // Get all todos
router.get("/todo/:id", todo);            // get todos by id
router.patch("/update/:id", updatetodo);  // update by id
router.delete("/delete/:id", deletetodo); //  delete by id 

export default router;
