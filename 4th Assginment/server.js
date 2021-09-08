const dotenv = require('dotenv')
const express = require('express')
const app = express()
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
const methodOverride = require('method-override')
const userLoginRouter = require('./routes/userLogin.route.js')
const Connct_Mongo_DB = require('./config/dbConfig.js')
const todosRoutes = require('./routes/todo.route.js')
const usersRoutes =require('./routes/user.route.js')
const bodyParser = require('body-parser')
const cors = require('cors');

// Initialisation of Mongodb connection
Connct_Mongo_DB();

if (process.env.NODE_ENV !== 'production') {
    dotenv.config()
}
const PORT = process.env.SERVER_PORT || 4040

app.set('view-engine', 'ejs')
app.use(express.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.use(express.json());  
app.use(flash())
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))
app.use(cors());
app.use(passport.initialize())
app.use(passport.session())
app.use(methodOverride('_method'))

//Routes

app.use('/user', userLoginRouter)           // Routes Login Webpage 

app.use("/todo", todosRoutes);      //For todo Router Database

require('./routes/user.route.js')(app)

app.listen(PORT, console.log(`server is running on port ${PORT}`))