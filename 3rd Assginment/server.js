import express from "express";
import Connct_Mongo_DB from "./dbConfig.js";
import todosRoutes from "./routes/todo.route.js";

const PORT = process.env.PORT || 4040;

// Initialisation of Mongodb connection
Connct_Mongo_DB();

const app = express()

app.use(express.json());  // Middleware

app.use("/todo", todosRoutes);

app.listen(PORT,console.log(`Server listening on ${PORT}`))