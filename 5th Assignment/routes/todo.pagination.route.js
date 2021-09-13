const express = require('express')
const router = express.Router();

const {  createTodo,
  allTodo,
  todoByid,
  todoByUser,
  category,
  categoryName,
  todoTitle,
  todoTitleName,
  registeredUsers,
  activeUsers
} = require('../controllers/todo.pagination.controller.js')

router.post("/add", createTodo);                    // Adds todos
//Pagination in all GET
router.get("/", allTodo);                           // Get all todos with Pagination localhost:4000/todoreport?page=1&size=5
router.get("/todoid/:id", todoByid);                // get todos by id // no need to paginate as it will alwayts produce one record
router.get("/user", todoByUser);                    // get todos by user  // localhost:4000/todoreport/user?name=6134842ba7e60af5a3f35bf8
router.get("/category", category);                  // get todos by all todo Category localhost:4000/todoreport/category
router.get("/categoryname", categoryName);          // get todos by Category type  localhost:4000/todoreport/categoryname?name=hobby
router.get("/title", todoTitle);                    // get todos by all todo title  localhost:4000/todoreport/title
router.get("/titlename", todoTitleName);            // get todos by todo title name  localhost:4000/todoreport/titlename?title=Playing

//API to get number of registered users for the Day, Week, Month with Pagination

router.get("/registeredusers/:id", registeredUsers);             //  localhost:4000/todoreport/registeredusers/Month?page=0&size=4

//API to get number of active users for the Day, Week, Month

router.get("/activeusers/:id", activeUsers);                    //   localhost:4000/todoreport/activeusers/Month?page=0&size=4

module.exports = router