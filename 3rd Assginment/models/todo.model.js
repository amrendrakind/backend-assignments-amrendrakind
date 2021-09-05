import mongoose from "mongoose";
const TodoSchema = mongoose.Schema(
  {
    userName: {
//     type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
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
      type: String 
    },
  createdAt :{
      type : Date,
      default : Date.now
  },
  updatedAt: {
      type: Date,
      default: Date.now
  },

  // writeConcern: {
  //   w: 'majority',
  //   j: true,
  //   wtimeout: 1000
  // }

  },
  { timestamps: true }
);
export default mongoose.model("TodoModel", TodoSchema);