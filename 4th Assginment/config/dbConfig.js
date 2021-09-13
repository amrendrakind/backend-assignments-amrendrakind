const dotenv =require('dotenv').config()
const mongoose = require('mongoose')

const MONGODB_URI = process.env.DATABASE_URL 

const connectDB = async () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDB Atlas Server is connected");
    });
}
module.exports = connectDB;