import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required:true
    },
    email : {
        type: String,
    },
    password : {
//        type: String,
    }
});

//module.exports = mongoose.model("User", userSchema);

export default mongoose.model("User", userSchema);