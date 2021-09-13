const bcrypt = require('bcrypt')
const passport = require('passport')
const initializePassport = require('../config/passport.config.js')

const users = []

initializePassport(
    passport,
    email => users.find(user => user.email === email),
    id => users.find(user => user.id === id)
)

// Index Page

module.exports.index = (req, res) => {
    res.render('index.ejs', { name: req.user.name })
}

// Login Existing User

module.exports.login = (req, res) => {
    res.render('login.ejs')
}
// Register Login Page

module.exports.getRegister = (req, res) => {
    res.render('register.ejs')
}

// Register New User

module.exports.postRegister = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10)
        users.push({
            id: Date.now().toString(),
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        })
        res.redirect('/user/login')
    } catch (error) {
        res.redirect('/user/register')
    }
}

//Post Login

module.exports.postLogin = passport.authenticate('local', {
    successRedirect: '/user',
    failureRedirect: '/user/login',
    failureFlash: true
})

// Delete

module.exports.logout = async (req, res) => {
    req.logOut()
    res.redirect('/user/login')
}

