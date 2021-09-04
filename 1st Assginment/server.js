import express from "express";
import mongoose from "mongoose";
import MONGODB_URL from "./dbConfig.js";
import todosRoutes from "./routes/todo.route.js";

const app = express()

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
mongoose.connection.on("connected", () => {
    console.log("MongoDB Atlas Server is connected");
  });
  

app.use(express.json());  // Middleware

app.use("/todo", todosRoutes);

app.listen(4000, ()=> console.log("Server has started"))