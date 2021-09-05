import dotenv from "dotenv"
import mongoose from "mongoose";
dotenv.config()
//DATABASE_URL = `mongodb+srv://favyt:mvKm7dKjIWcnxynd@cluster-favyt.nlf6u.mongodb.net/ToDoList?retryWrites=true&w=majority`

const MONGODB_URI = process.env.DATABASE_URL 

const connectDB = async () => {
    mongoose.connect(MONGODB_URI, {
        useNewUrlParser: true,
//        useCreateIndex: true,
        useUnifiedTopology: true,
    });

    mongoose.connection.on("connected", () => {
        console.log("MongoDB Atlas Server is connected");
    });
}
export default connectDB;