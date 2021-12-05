const mongoose = require('mongoose')
// eslint-disable-next-line new-cap
const router = require('express').Router()
const auth = require('../auth')
const Users = mongoose.model('Users')
require('dotenv').config({ silent: true })
const DB_ADDR = process.env.DB_ADDR

// deletes all users in data base
router.delete('/deleteallusers', auth.optional, async (req, res, next) => {
    const {
        payload: { _id },
    } = req
    // console.log(req);
    // console.log('id: ', _id)

    const admin = await Users.findById(_id)
    if (!admin.isAdmin)
        return res
            .status(400).json({ error: 'Require admin user for this action.' })

    Users.deleteMany({}, function (err) {
        if (err) return res.status(500).json({ messasge: 'deleteMany() failed' })
        else {
            return res.json({ message: 'Sucess' })
        }
    })
})

// deletes the entire database
router.delete('/wipedb', auth.optional, async (req, res, next) => {
    const {
        payload: { _id },
    } = req

    const admin = await Users.findById(_id)
    if (!admin.isAdmin)
        return res
            .status(400)
            .json({ error: 'Require admin user for this action.' })

    const conn = mongoose.createConnection(DB_ADDR)
    conn.dropDatabase().then(() =>
        res.json({ message: 'Successfully dropped database' })
    )
})

// fill the database with dummy user data -- five usernames that start with test_, and random passwords
router.post('/dummyfill', auth.required, async (req, res, next) => {
    /**
     * Create a random string of given length
     * @param {number} length Length of the random string
     * @return {string} Generated random string
     */
    function makeid(length) {
        let result = ''
        const characters =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
        const charactersLength = characters.length
        for (let i = 0; i < length; i++) {
            result += characters.charAt(
                Math.floor(Math.random() * charactersLength)
            )
        }
        return result
    }

    const {
        payload: { _id },
    } = req

    const admin = await Users.findById(_id)
    if (!admin.isAdmin)
        return res
            .status(400)
            .json({ error: 'Require admin user for this action.' })

    const insertedusers = []

    for (let i = 0; i < 5; i++) {
        const user = {
            username: 'test_' + makeid(10),
            password: makeid(10),
        }

        const finalUser = new Users(user)
        finalUser.isAdmin = false

        finalUser.setPassword(user.password)
        // eslint-disable-next-line no-unused-vars
        const saved = await finalUser.save()
        console.log('Save success, pushing ', {
            user: finalUser.generateAuthRes(),
        })
        insertedusers.push({ user: finalUser.generateAuthRes() })
    }
    console.log('Inserted user = ', insertedusers)
    return res.json(insertedusers)
})

module.exports = router
