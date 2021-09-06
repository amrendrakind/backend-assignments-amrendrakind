import User from "../models/user.model.js";
// import UserTodoList from "../models/user.todo.model.js";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken";

// New user cration
export const newUser = async (req, res) => {
  try {
    const newuser = new User(req.body);
    newuser.save();
    res.send(newuser);
  } catch (err) {
    res.send({ message: err.message });
  }
}
// fetching all users data
export const allUsers = async (req, res) => {
  User.find()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
// search user by id
export const userid = async (req, res) => {
  User.findById(req.params.id)
    .then((doc) => {
      if (!doc) {
        return res.status(404).json("User not available");
      }
      return res.status(200).json(doc);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};

// Search todo by user

export const userTodo = async (req, res) => {
  
  var query = req.params.query;
  
  User.find({
      '_id': query
  }, function (err, result) {
      if (err) throw err;
      if (result) {
          res.json(result)
      } else {
          res.send(JSON.stringify({
              error: 'Error'
          }))
      }
  })

};

export default newUser