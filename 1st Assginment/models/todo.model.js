import mongoose from "mongoose";

const TodoSchema = mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
    },
    todotitle: {
      type: String,
    },
    status: { type: String },
    category: { type: String },
  },
  { timestamps: true }
);

export default mongoose.model("TodoModel", TodoSchema);
