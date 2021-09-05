import TodoModel from "../models/todo.model.js";
//create new todo
export const createTodo = async (req, res) => {
    try {
        const newtodo = new TodoModel(req.body);
        newtodo.save();
        res.send(newtodo);
    } catch (err) {
        res.send({ message: err.message });
    }
};
//fetch all todos
export const allTodo = async (req, res) => {

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
export const todoByid = async (req, res) => {
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
//updating to do
export const updateTodo = async (req, res) => {
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
export const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const userExist = await TodoModel.findById(req.params.id);
    if (!userExist)
        return res.status(404).send(`No Todo with id: ${id}`);

    await TodoModel.findByIdAndRemove(id);

    res.json({ message: "Todo deleted successfully." });
};

// fetch by category (all data which has category)
export const category = async (req, res) => {

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
export const categoryName = async (req, res) => {

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
export const todoTitle = async (req, res) => {

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
export const todoTitleName = async (req, res) => {

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
