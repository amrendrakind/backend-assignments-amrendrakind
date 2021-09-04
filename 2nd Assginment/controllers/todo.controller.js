
import TodoModel from "../models/todo.model.js";
//create new todo
export const createtodo = async (req, res) => {
    try {
        const newtodo = new TodoModel(req.body);
        newtodo.save();
        res.send(newtodo);
    } catch (err) {
        res.send({ message: err.message });
    }
};
//fetch all todos
export const Alltodo = async (req, res) => {

    TodoModel.find()
        // .select("username todotitle status category")
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
export const todobyid = async (req, res) => {
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
export const updatetodo = async (req, res) => {
    const { username, status, todotitle, category } = req.body;
    const userExist = await TodoModel.findById(req.params.id);
    if (userExist) {
        const key = userExist._id;
        const updateuser = new TodoModel({ status, category });
        TodoModel.findByIdAndUpdate(key, {
            username: req.body.username,
            status: req.body.status,
            todotitle: req.body.todotitle,
            category: req.body.category,
        }).then(() => {
            res.status(200).json({ message: "Todo updated.." });
        });
    }
};
//Delete todos by id
export const deletetodo = async (req, res) => {
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

export const categoryname = async (req, res) => {

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

export const todotitle = async (req, res) => {

    TodoModel.find({ todotitle: { $exists: true, $ne: null } })
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

export const todotitlename = async (req, res) => {

    var query = req.params.query;
    TodoModel.find({
        'todotitle': query
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
