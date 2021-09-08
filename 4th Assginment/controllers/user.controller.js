const User = require('../models/user.model.js')
const TodoModel = require('../models/todo.model.js')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userControl = {

  register: async (req, res) => {
        try {
          const { username, email, password, phone, role } = req.body;
          const user = await User.findOne({ username });
          if (user) {
              return res.status(400).json({ msg: `User ${username} already exists` })
          }
          if (password.length < 6) {
              return res.status(400).json({ msg: "Password length too short" })
          }
          const passwordHash = await bcrypt.hash(password, 10);
          const newUser = new User({ username, email, password: passwordHash , phone, role });
          await newUser.save();
          res.json({ msg: `${username} Registered Successfully..!` })

        } catch (err) {
          return res.status(500).json({ msg: err.message });
      }      
    },


  login: async (req, res) => {
      try {
          
        const name =req.params.name
        await User.findOne({ username: name })
              .exec((err, user) => {
                  if (err) {
                      res.status(500).send({ message: err });
                      return;
                  }
                  if (!user) {
                      return res.status(404).send({ message: "User Not found." });
                  }

                  var passwordIsValid = bcrypt.compareSync( req.body.password, user.password );

                  if (!passwordIsValid) {
                      return res.status(401).send({
                          accessToken: null,
                          message: "Invalid Password!"
                      });
                  }

                  var token = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
                      expiresIn: 86400 // 24 hours
                  });
                  var authorities;

                  if (user.role === 'admin') {

                      authorities="User Admin";
                  } else if (user.role === 'user') {
                      authorities = "User"
                  }


                  res.status(200).send({
                      accessToken: token,
                      name: user.username,
                      role: authorities,
                  });
              });

      } catch (err) {
          return res.status(500).json({ msg: err.message });
      }
  },



  getAllUsers: async (req, res) => {
      try {
          const user = await User.find().select("-password");
          res.json(user);
      }catch (err) {
          res.status(500).json({ msg: err.message })
      }
    }





}


module.exports = userControl;





//--------------------------

// // New user cration
// module.exports.newUser = async (req, res) => {
//   try {
//     const newuser = new User(req.body);
//     newuser.save();
//     res.send(newuser);
//   } catch (err) {
//     res.send({ message: err.message });
//   }
// }
// // fetching all users data
// module.exports.allUsers = async (req, res) => {
//   User.find()
//     .then((user) => {
//       res.json({ user });
//     })
//     .catch((err) => {
//       res.send({ message: err.message });
//     });
// };
// // search user by id
// module.exports.userid = async (req, res) => {
//   User.findById(req.params.id)
//     .then((doc) => {
//       if (!doc) {
//         return res.status(404).json("User not available");
//       }
//       return res.status(200).json(doc);
//     })
//     .catch((err) => {
//       res.send({ message: err.message });
//     });
// };

// // Search todo by user

// module.exports.userTodo = async (req, res) => {
  
//   var query = req.params.query;
//   const userForTodo= await User.findOne({username:query})
//   console.log(userForTodo._id.toString())
//   await TodoModel.find({userName: userForTodo._id.toString()})
//     .select("userName category todoTitle isComplete status")
//     .exec()
//     .then((doc) => {
//       if (!doc) {
//         return res.status(404).json("User not available in Todo List");
//       }
//       return res.status(200).json(doc);
//     })
//     .catch((err) => {
//       res.send({ message: err.message });
//     });
// };
