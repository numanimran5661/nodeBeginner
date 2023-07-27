const express = require('express')
const mongoose = require('mongoose')
// const cookiesSession = require("cookie-session")
const session = require('express-session')
const passport = require('passport')
const keys = require('./config/keys')
require('./models/User')
require('./services/passport')

mongoose.connect(keys.mongoURI)

const app = express()

app.use(
    session({
        secret: keys.cookieKey,
        resave: false,
        saveUninitialized: true,
        cookie: {
          maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        },
      })
)
app.use(passport.initialize());
app.use(passport.session());

require('./routes/authRoutes') (app)

const PORT = process.env.PORT || 5000

app.listen(PORT)