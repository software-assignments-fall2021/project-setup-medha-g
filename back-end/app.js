const express = require('express')
const path = require('path')
const session = require('express-session')
const cors = require('cors')
const mongoose = require('mongoose')
const errorHandler = require('errorhandler')
const schedule = require('node-schedule')
const Users = require('./models/users');
require('dotenv').config({ silent: true })

mongoose.promise = global.Promise
const UsersMod = mongoose.model('Users')

const isProduction = process.env.NODE_ENV === 'production'
const DB_ADDR = process.env.DB_ADDR
const SESSION_SECRET = process.env.SESSION_SECRET

const app = express()

// configure the app
app.use(cors())
// app.use(require('morgan')('dev'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))
app.use(
    session({
        secret: SESSION_SECRET,
        cookie: { maxAge: 60000 },
        resave: false,
        saveUninitialized: false,
    })
)

if (!isProduction) {
    app.use(require('morgan')('dev'))
    app.use(errorHandler())
}
app.use((err, req, res, next) => {
    if (err && err.name == 'UnauthorizedError') {
        res.status(401).send('Invalid Token')
    }
})

// connect to temporary mongodb ran on local machine
mongoose.connect(DB_ADDR)
if (!isProduction) mongoose.set('debug', true)

// calculate the average monthly spending at the first day of every month
const monthly_spending_job = schedule.scheduleJob('1 * *', async function() {
    console.log("Calculating average monthly spending");
    const all = await UsersMod.find({});
    for(let user of all) {
        let sum = 0.0;
        for(sub of user.subscriptions) {
            if(sub.plan.time_unit === "day") {
                sum += (30.0 / sub.plan.time_quantity) * sub.plan.price;
            } else if(sub.plan.time_unit === "month") {
                sum += (1.0 / sub.plan.time_quantity) * sub.plan.price;
            } else if(sub.plan.time_unit === "year") {
                sum += (1.0 / (12.0 * sub.plan.time_quantity)) * sub.plan.price;
            }
        }

        user.spending.push(sum);
        if(user.spending.length > 48) user.spending.shift();
        user.save();
    }
})


// Models and Routers
require('./models/users')
require('./config/passport')
app.use(require('./routes'))

module.exports = app
