// setup
require('dotenv').config()
const express = require('express')
const app = express()
const port = 8080
const expressLayouts = require('express-ejs-layouts')
const methodOverride = require('method-override')
const session = require('express-session')
const setCurrentUser = require('./middlewares/set_current_user')
const ensureLoggedIn = require('./middlewares/ensure_logged_in')

// initialise
app.set('view engine', 'ejs')
app.use(expressLayouts)
app.use(express.static('public'))
app.use(methodOverride('_method'))
app.use(express.urlencoded())
app.use(session({
    cookie: { maxAge: 1000 * 60 * 60 * 24 * 3 }, // approx 3 days
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

// define routers
const homeRouter = require('./routes/home_router')
const sessionRouter = require('./routes/session_router')
const tripRouter = require('./routes/trip_router')
const activityRouter = require('./routes/activity_router')
const categoryRouter = require('./routes/category_router')


// use routes and middlewares
app.use(setCurrentUser)
app.use(homeRouter)
app.use(sessionRouter)
app.use(ensureLoggedIn)
app.use(tripRouter)
app.use(activityRouter)
app.use(categoryRouter)
// app.use(bucketlistRouter)

// listen on port
app.listen(port, () => {
    console.log(`ready to travel from port ${port}`);
})