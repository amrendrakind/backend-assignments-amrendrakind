import express from "express";
import Connct_Mongo_DB from "./dbConfig.js";
import todosRoutes from "./routes/todo.route.js";
import usersRoutes from "./routes/user.route.js";
import bodyParser from "body-parser"


const PORT = process.env.PORT || 4040;

// Initialisation of Mongodb connection
Connct_Mongo_DB();

const app = express()

app.use(bodyParser.json());
app.use(express.json());  // Middleware

app.use("/todo", todosRoutes);      //For todo Route
app.use('/user', usersRoutes);      //For User Route


app.listen(PORT,console.log(`Server listening on ${PORT}`))