import express from "express";
import mongoose from "mongoose";
import MONGODB_URL from "./dbConfig.js";
import usersRoutes from "./routes/user.route.js";

const app = express()

mongoose.connect(MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  
mongoose.connection.on("connected", () => {
    console.log("MongoDB Atlas Server is connected");
  });
  

  //Middleware
app.use(express.json());

app.use('/user', usersRoutes);



app.listen(4000, ()=> console.log("Server has started"))