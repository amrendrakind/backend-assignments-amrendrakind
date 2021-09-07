const bcrypt = require('bcrypt')
const LocalStragey = require('passport-local').Strategy

function initialize(passport, getUserByEmail, getUserByID) {
    const authenticateUser = async (email, password, done) => {
        const user = getUserByEmail(email)
        if (user == null) {
            return done(null, false, { message: 'No user with email id' })
        }
        try {
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user)
            } else {
                return done(null, false, { message: 'Incorrect Password' })
            }

        } catch (error) {
            return done(error)
        }
    }
    passport.use(new LocalStragey({ usernameField: 'email' }, authenticateUser))
    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => { return done(null, getUserByID(id)) })
}

module.exports = initialize
