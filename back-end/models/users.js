const mongoose = require('mongoose')
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
require('dotenv').config({ silent: true })

const JWT_SECRET = process.env.JWT_SECRET

const { Schema } = mongoose

// define user schema for mongodb
const UsersSchema = new Schema({
    username: String,
    hashed_password: String,
    salt: String,
    isAdmin: Boolean,
    spending: [Number], 
    subscriptions: [
        {
            image: String,
            title: String,
            description: String,
            tags: [String],
            plan: {
                price: Number,
                time_quantity: Number,
                time_unit: String,
            },
        },
    ],
})

UsersSchema.methods.setPassword = function (password) {
    // Generate salt for this username and use salt for hashing password
    this.salt = crypto.randomBytes(16).toString('hex')
    this.hashed_password = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex')
}

UsersSchema.methods.validatePassword = function (password) {
    // Hash given password to compare to stored one
    const hash = crypto
        .pbkdf2Sync(password, this.salt, 10000, 512, 'sha512')
        .toString('hex')

    return this.hashed_password === hash
}
UsersSchema.methods.addSubscription = function (sub) {
    this.subscriptions.push(sub)
}
UsersSchema.methods.deleteSubscription = function (index) {
    this.subscriptions.splice(index, 1);
}

UsersSchema.methods.generateJWT = function () {
    // generate JWT tokens
    const today = new Date()
    const expirationDate = new Date(today)
    expirationDate.setTime(today.getTime() + 2 * 60 * 60 * 1000)

    return jwt.sign(
        {
            username: this.username,
            _id: this.id,
            exp: parseInt(expirationDate.getTime() / 1000, 10),
        },
        JWT_SECRET // sign with HS256
    )
}

UsersSchema.methods.generateAuthRes = function () {
    // generate auth response that returns newest token
    return {
        username: this.username,
        _id: this.id,
        token: this.generateJWT(),
    }
}

mongoose.model('Users', UsersSchema)
