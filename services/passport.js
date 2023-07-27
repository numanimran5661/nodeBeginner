const passport = require('passport')
const keys = require('../config/keys')
const mongoose = require('mongoose')
const GoogleStrategy = require('passport-google-oauth20').Strategy

const User = mongoose.model('users')

passport.serializeUser((user, done) => {
    done(null, user.id)
})

passport.deserializeUser((id, done) => {
    User.findById(id)
    .then((user) => {
        done(null, user)
    })
})

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
    .then( existingUser => {
        if(existingUser){
            // we already have the record of the given profil id
            done(null, existingUser)
        } else {
            // we don't have any record of this id
            new User({ googleId: profile.id, name: profile.displayName}).save()
            .then( user => done(null, user))
        }
    })
}))