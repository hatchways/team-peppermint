const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const User = require('../models/UserModel')

const cookieExtractor = (req, res) => {
    let token = null
    if (req && req.cookies) {
        token = req.cookies["access_token"]
    }
    return token
}

module.exports = (passport) => {
    //authentication
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
        },
            (email, password, done) => {
                User.findOne({ email }, (err, user) => {
                    //Something went wrong on DB
                    if (err) return done(err)
                    //User not found
                    if (!user) return done(null, false)
                    //Check if password is correct
                    user.comparePassword(password, done)

                })

            })
    )
    //authorization
    passport.use(new JWTstrategy({
        jwtFromRequest: cookieExtractor,
        secretOrKey: process.env.JWT_SECRET
    }, (payload, done) => {
        User.findById({ _id: payload.sub }, (err, user) => {
            if (err)
                return done(err, false)
            if (user)
                return done(null, user)
            else
                return done(null, false)
        })
    }))

}