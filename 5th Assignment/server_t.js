const mongoose = require("mongoose");
const moment = require('moment')
const TodoModel = require('./models/todo.model.js')

// var inputDate = new Date(myDate.toISOString());
// TodoModel.find({ 'createdAt': { $lte: inputDate }
// })


// Items.find({sellingState: "Active", 
    
//     endTime: {$lt: new Date(moment().subtract(1, 'day').toISOString())}}, {limit: 10})

    var inputDate = new Date(moment().subtract(1, 'day').toISOString())

    const data = await TodoModel.find({ 'createdAt': { $lte: inputDate } })
   
    console.log(data)

    module.exports.userForDay = async (req, res) => {

        const data = await TodoModel.find({ 'createdAt': { $lte: inputDate } })
   
        console.log(data)
  
        
        // TodoModel.find({ todoTitle: { $exists: true, $ne: null } })
        // .sort( {createdAt :-1})                  //Sort data by creation time stamp 
  
        // .then((doc) => {
        //     if (!doc) {
        //         return res.status(404).json("Todo is not available");
        //     }
        //     return res.status(200).json(doc);
        // })
        // .catch((err) => {
        //     res.send({ message: err.message });
        // });
    
    
    };
    




