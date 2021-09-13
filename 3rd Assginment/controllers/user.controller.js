import User from "../models/user.model.js";
import TodoModel from "../models/todo.model.js";
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

// Role based Search  of todo list by user

export const userTodo = async (req, res) => {
  var query = req.params.query;
  const userForTodo= await User.findOne({username:query})

  if(!userForTodo){
    return res.status(404).json("User not available");
  }
  
  if(userForTodo.role==='user'){
        await TodoModel.find({userName: userForTodo._id.toString()})
            .select("userName category todoTitle isComplete status")
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
  if(userForTodo.role==='admin'){
        await TodoModel.find()
        .select("userName category todoTitle isComplete status")
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
    }
 }


export default newUser