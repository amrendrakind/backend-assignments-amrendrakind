import mongoose from "mongoose";
const TodoSchema = mongoose.Schema(
  {
    username: {
//      type: String,
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
    },
    todotitle: {
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
  }
  },
  { timestamps: true }
);
export default mongoose.model("TodoModel", TodoSchema);