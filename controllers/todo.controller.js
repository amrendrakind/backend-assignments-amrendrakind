
import TodoModel from "../models/todo.model.js";

export const createtodo = async (req, res) => {
    try {
        const newtodo = new TodoModel(req.body);
        newtodo.save();
        res.send(newtodo);
    } catch (err) {
        res.send({ message: err.message });
    }
};

export const Alltodo = async (req, res) => {

    TodoModel.find()
        .select("username todotitle status category")
        .exec()
        .then((data) => {
            res.status(200).json(data);
        })
        .catch((er) => {
            res.status(500).json({
                message: er.message,
            });
        });
};


export const todo = async (req, res) => {
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



export const updatetodo = async (req, res) => {
    const { name, status, todotitle, category } = req.body;
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


export const deletetodo = async (req, res) => {
    const { id } = req.params;
    const userExist = await TodoModel.findById(req.params.id);
    if (!userExist)
        return res.status(404).send(`No Todo with id: ${id}`);

    await TodoModel.findByIdAndRemove(id);

    res.json({ message: "Todo deleted successfully." });
};


//export default createtodo