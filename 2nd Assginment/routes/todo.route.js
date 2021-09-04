import express from "express";
const router = express.Router();    //Router 
const app = express();
app.use(express.json());

import {
  createtodo,
  Alltodo,
  todobyid,
  updatetodo,
  deletetodo,
  category,
  categoryname,
  todotitle,
  todotitlename
} from "../controllers/todo.controller.js";

router.post("/add", createtodo);                           // Add todos
router.get("/alltodos", Alltodo);                          // Get all todos
router.get("/todo/:id", todobyid);                         // get todos by id
router.patch("/update/:id", updatetodo);                   // update by id
router.delete("/delete/:id", deletetodo);                  // delete by id 
router.get("/category", category);                         // get todos by all todo Category 
router.get("/category/:query", categoryname);              // get todos by Category type
router.get("/title", todotitle);                           // get todos by all todo title
router.get("/title/:query", todotitlename);                // get todos by todo title name

export default router;
