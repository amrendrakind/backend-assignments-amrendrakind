const User = require('../models/user.model.js')

// New user cration
module.exports.newUser = async (req, res) => {
  try {
    const newuser = new User(req.body);
    newuser.save();
    res.send(newuser);
  } catch (err) {
    res.send({ message: err.message });
  }
}
// fetching all users data
module.exports.allUsers = async (req, res) => {
  User.find()
    .then((user) => {
      res.json({ user });
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
// search user by id
module.exports.userid = async (req, res) => {
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

module.exports.userTodo = async (req, res) => {
  
  var query = req.params.query;
   await User.findOne({_id: query})
      .populate("todo")
      .exec()
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
