const mongoose = require('mongoose')
const mongoosePaginate = require('mongoose-paginate-v2')

const TodoSchema = mongoose.Schema(
  {
    userName: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    todoTitle: {
      type: String,
    },
    isComplete:{
      type : Boolean,
      default : false
    },
    status: { 
      type: String,
      default: "Just Started"
    },
    category: { 
      type: String,
      enum :['work','hobby','task','Work','Hobby','Task'],
      default : 'hobby'
    },
  createdAt :{
      type : Date,
      default : Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  },

  });
  
  TodoSchema.plugin(mongoosePaginate);

module.exports = mongoose.model("TodoModel", TodoSchema);




















// const mongoose = require('mongoose')
// const TodoSchema = mongoose.Schema(
//   {
//     userName: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "User",
//     },
//     todoTitle: {
//       type: String,
//     },
//     isComplete:{
//       type : Boolean,
//       default : false
//     },
//     status: { 
//       type: String,
//       default: "Just Started"
//     },
//     category: { 
//       type: String,
//       enum :['work','hobby','task','Work','Hobby','Task'],
//       default : 'hobby'

//     },
//   createdAt :{
//       type : Date,
//       default : Date.now
//   },
//   updatedAt: {
//       type: Date,
//       default: Date.now
//   },

//   });
  

// module.exports = mongoose.model("TodoModel", TodoSchema);

