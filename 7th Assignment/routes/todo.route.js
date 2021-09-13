module.exports = app => {
  const todoModel = require("../controllers/todo.controller.js");

  var router = require("express").Router();
  
  router.post("/", todoModel.create)         // Insert single record into a todos list
  router.get("/", todoModel.findAll)         // Retrieve all todos data
  router.get("/:id", todoModel.findOne)      // Fetch a single Todo with id
  router.put("/:id", todoModel.update)       // Update a Todos with id
  router.delete("/:id", todoModel.delete)    // Delete a Todo with id
  router.delete("/", todoModel.deleteAll)    // Delete all Todos

  app.use("/api/todos", router);             //  Main Router
};
