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

  },
  { timestamps: true }
);
export default mongoose.model("TodoModel", TodoSchema);