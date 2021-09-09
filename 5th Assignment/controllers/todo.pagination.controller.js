const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const { findOne } = require("../models/todo.model.js");

const TodoModel = require('../models/todo.model.js')

const getPagination = (page, size) => {
    const limit = size ? +size : 3;
    const offset = page ? page * limit : 0;
  
    return { limit, offset };
  };

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

    const { page, size, title } = req.query;
    
    var condition = title 
        ? {  todoTitle : { $regex: new RegExp(title), $options: "i" } } : {};

    const { limit, offset } = getPagination(page, size);

    TodoModel.paginate(condition, { offset, limit })

        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Todo: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            })

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

    const { page, size, name } = req.query;
    const { limit, offset } = getPagination(page, size);

    TodoModel.paginate({userName : name}, { offset, limit })

        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Todo: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            })

        })
        .catch((er) => {
            res.status(500).json({
                message: "Please enter correct name",
            });
        });

};

// fetch by category (all data which has category)
module.exports.category = async (req, res) => {

    const { page, size, name } = req.query;
    const { limit, offset } = getPagination(page, size);

    TodoModel.paginate({category : { $exists: true, $ne: null }}, { offset, limit })
//TodoModel.paginate({category : name}, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Todo: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            })

        })
        .catch((er) => {
            res.status(500).json({
                message: "Some error occurred while retrieving category." || er.message
          
            });
        });


    // TodoModel.find({ category: { $exists: true, $ne: null } })
    //     .then((doc) => {
    //         if (!doc) {
    //             return res.status(404).json("Todo is not available");
    //         }
    //         return res.status(200).json(doc);
    //     })
    //     .catch((err) => {
    //         res.send({ message: err.message });
    //     });
};

// fetch all data by category type
module.exports.categoryName = async (req, res) => {
    const { page, size, name } = req.query;
    const { limit, offset } = getPagination(page, size);

    TodoModel.paginate({category : name}, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Todo: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            })

        })
        .catch((er) => {
            res.status(500).json({
                message: "Some error occurred while retrieving category." || er.message
          
            });
        });
};

// fetch by todo title (all data which has title)
module.exports.todoTitle = async (req, res) => {

    const { page, size } = req.query;
    const { limit, offset } = getPagination(page, size);

    TodoModel.paginate({todoTitle : { $exists: true, $ne: null }}, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Todo: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            })

        })
        .catch((er) => {
            res.status(500).json({
                message: "Some error occurred while retrieving Title." || er.message
          
            });
        });
};

// fetch all data by todo title type
module.exports.todoTitleName = async (req, res) => {

    const { page, size, title } = req.query;
    const { limit, offset } = getPagination(page, size);

    TodoModel.paginate({todoTitle : title}, { offset, limit })
        .then((data) => {
            res.send({
                totalItems: data.totalDocs,
                Todo: data.docs,
                totalPages: data.totalPages,
                currentPage: data.page - 1,
            })

        })
        .catch((er) => {
            res.status(500).json({
                message: "Some error occurred while retrieving category." || er.message
          
            });
        });


};

