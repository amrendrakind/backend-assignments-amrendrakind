const User = require('../models/user.model.js')
const TodoModel = require('../models/todo.model.js')

//create new todo
module.exports.createTodo = async (req, res) => {
    try {
        const newtodo = new TodoModel(req.body);
        newtodo.save();
        res.send(newtodo);
    } catch (err) {
        res.send({ message: err.message });
    }
};
//fetch all todos
module.exports.allTodo = async (req, res) => {

    TodoModel.find()
        // .select("userName todoTitle status category")
        // .exec()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((er) => {
            res.status(500).json({
                message: er.message,
            });
        });
};
//search todo by id
module.exports.todoByid = async (req, res) => {
    TodoModel.findById(req.params.id)
        .then((doc) => {
            if (!doc) {
                return res.status(404).json("Todo is not available");
            }
            return res.status(200).json(doc);
        })
        .catch((err) => {
            res.send({ message: err.message });
        });
};

// Search todo by user

module.exports.todoByUser = async (req, res) => {

    var query = req.params.query;
    TodoModel.find({
        'userName': query
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


//updating to do
module.exports.updateTodo = async (req, res) => {
    const { userName, status, todoTitle, category } = req.body;
    const userExist = await TodoModel.findById(req.params.id);
    if (userExist) {
        const key = userExist._id;
        const updateuser = new TodoModel({ status, category });
        TodoModel.findByIdAndUpdate(key, {
            userName: req.body.userName,
            status: req.body.status,
            todoTitle: req.body.todoTitle,
            category: req.body.category,
        }).then(() => {
            res.status(200).json({ message: "Todo updated.." });
        });
    }
};
//Delete todos by id
module.exports.deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userExist = await TodoModel.findById(req.params.id);
    //console.log(TodoModel.count())

    if (!userExist)
        return res.status(404).send(`No Todo with id: ${id}`);

    await TodoModel.findByIdAndRemove(id);

    res.json({ message: "Todo deleted successfully." });
};


//Delete all todos
module.exports.deleteAllTodo = async (req, res) => {
    await TodoModel.deleteMany({});
    res.json({ message: "All Todos deleted successfully." });
    
};

// fetch by category (all data which has category)
module.exports.category = async (req, res) => {

    TodoModel.find({ category: { $exists: true, $ne: null } })
        .then((doc) => {
            if (!doc) {
                return res.status(404).json("Todo is not available");
            }
            return res.status(200).json(doc);
        })
        .catch((err) => {
            res.send({ message: err.message });
        });
};

// fetch all data by category type
module.exports.categoryName = async (req, res) => {

    var query = req.params.query;
    TodoModel.find({
        'category': query
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

// fetch by todo title (all data which has title)
module.exports.todoTitle = async (req, res) => {

    TodoModel.find({ todoTitle: { $exists: true, $ne: null } })
        .sort( {createdAt :1})                  //Sort data by creation time stamp 
        .then((doc) => {
            if (!doc) {
                return res.status(404).json("Todo is not available");
            }
            return res.status(200).json(doc);
        })
        .catch((err) => {
            res.send({ message: err.message });
        });
};

// fetch all data by todo title type
module.exports.todoTitleName = async (req, res) => {

    var query = req.params.query;
    TodoModel.find({
        'todoTitle': query
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

//Search todo by user

module.exports.todoTask = async (req, res) => {
  
  var query = req.params.query;
  
  const userForTodo= await User.findOne({username:query})
  console.log(userForTodo._id.toString())
  await TodoModel.find({userName: userForTodo._id.toString()})
    .select("userName category todoTitle isComplete status")
    .exec()
    .then((doc) => {
      if (!doc) {
        return res.status(404).json("User not available in Todo List");
      }
      return res.status(200).json(doc);
    })
    .catch((err) => {
      res.send({ message: err.message });
    });
};
