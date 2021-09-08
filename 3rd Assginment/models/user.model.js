import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username : {
        type: String,
        required:true,
        unique:true,
        trim:true
    },
    email : {
        type: String,
        required:true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,'Valid email only!']
    },
    phone : {
        type: String,
        required : true,
        validator: function(v) {
            return /\d{10}/.test(v);
          },
          message: props => `${props.value} is not a valid phone number!`
    },
    password : {
        type : String,
        required : [true, 'Password can not be blank!'],
        minlength : 6,
    },
    role : {
        type : String,
        enum :['admin','user'],
        default : 'user'
    },
    accessToken: {
        type: String,
    },
    createdAt :{
        type : Date,
        default : Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    todo :[{
        type : mongoose.Schema.Types.ObjectId,
        ref : "TodoModel"
    }],

},
{timeStamps:true});

export default mongoose.model("User", userSchema);
