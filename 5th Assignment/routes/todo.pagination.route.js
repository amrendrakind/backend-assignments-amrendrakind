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
} = require('../controllers/todo.pagination.controller.js')

router.post("/add", createTodo);                           // Add todos

router.get("/alltodos", allTodo);                          // Get all todos with Pagination

router.get("/todo/:id", todoByid);                         // get todos by id

router.get("/user/:query", todoByUser);                    // get todos by user

router.get("/category", category);                         // get todos by all todo Category 
router.get("/category/:query", categoryName);              // get todos by Category type
router.get("/title", todoTitle);                           // get todos by all todo title
router.get("/title/:query", todoTitleName);                // get todos by todo title name


module.exports = router