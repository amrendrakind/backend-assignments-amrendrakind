const express = require('express')
const router = express.Router();
const {  createTodo,
  allTodo,
  todoByid,
  todoByUser,
  updateTodo,
  deleteTodo,
  deleteAllTodo,
  category,
  categoryName,
  todoTitle,
  todoTitleName
} = require('../controllers/todo.controller.js')

router.post("/add", createTodo);                           // Add todos
router.get("/alltodos", allTodo);                          // Get all todos
router.get("/todo/:id", todoByid);                         // get todos by id

router.get("/user/:query", todoByUser);                    // get todos by user

router.patch("/update/:id", updateTodo);                   // update by id
router.delete("/delete/:id", deleteTodo);                  // delete by id 
router.delete("/deleteall/", deleteAllTodo);               // delete by id 
router.get("/category", category);                         // get todos by all todo Category 
router.get("/category/:query", categoryName);              // get todos by Category type
router.get("/title", todoTitle);                           // get todos by all todo title
router.get("/title/:query", todoTitleName);                // get todos by todo title name


router.get("/title/:query", todoTitleName);                // get todos by todo title name





module.exports = router