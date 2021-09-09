const User = require('../models/user.model.js')
const TodoModel = require('../models/todo.model.js')
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const moment = require('moment');

const userControl = {

  register: async (req, res) => {   //New user registration/SignUp
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


  login: async (req, res) => {      //Login only after registration
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

                      authorities="Admin";
                  } else if (user.role === 'user') {
                      authorities = "User"
                  }

                  res.status(200).send({
                      accessToken: token,
                      user: {name:user.username, email: user.email, role: authorities}
                  });
              });

      } catch (err) {
          return res.status(500).json({ msg: err.message });
      }
  },
// Getting details of all data by Admin
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