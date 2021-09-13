const db = require('../models')
const todoModel = db.todoModels;

//create new todo
module.exports.create = async (req, res) => {

    // Validate request
    if (!req.body.username) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
        return;
    }
    // Create a todo
    const todo = {
        username: req.body.username,
        title: req.body.title,
        isComplete: req.body.isComplete ? req.body.isComplete : false,
        status: req.body.status,
        category: req.body.category
    };
    todoModel.create(todo)
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({ message: 'Some error occured while creating table' || err.message });
        })
}

//fetch all todos 
module.exports.findAll = async (req, res) => {

    todoModel.findAll()
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({
                message: "Some error occurred while retrieving Todos." || err.message
            });
        });
}

// Find a single todos with an id
exports.findOne = async (req, res) => {

    const id = req.params.id;
    const exist = await todoModel.findByPk(id)
    if (exist == null) {
        return res.send(`Record with id ${id} does not exist`)
    }
    todoModel.findByPk(id)
        .then(data => { res.send(data) })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Todos with id=" + id
            });
        });
}

// Update a todo by the id 
exports.update = async (req, res) => {

    const id = req.params.id;
    await todoModel.update(req.body, {
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: "Todo List updated successfully."
                });
            } else {
                res.send({
                    message: `Cannot update todo list with id = ${id}. Todos was not found or req.body is empty!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Error updating Todo with id=" + id
            });
        });
}
// Delete a todos with the specified id 
exports.delete = async (req, res) => {

    const id = req.params.id;
    await todoModel.destroy({
        where: { id: id }
    })
        .then(num => {
            if (num == 1) {
                res.send({
                    message: `Todo with id = ${id} was deleted successfully!`
                });
            } else {
                res.send({
                    message: `Cannot delete Todo with id = ${id} as Todo was not found!`
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                message: "Could not delete Todo with id=" + id
            });
        });
}
// Delete all Todos from the database.
exports.deleteAll = async (req, res) => {
 
    await todoModel.destroy({
        where: {},
        truncate: false
    })
        .then(nums => {
            res.send({ message: `${nums} Todos were deleted successfully!` });
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Error occurred while removing all todos."
            });
        });
}
