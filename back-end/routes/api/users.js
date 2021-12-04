const mongoose = require('mongoose')
const passport = require('passport')
// eslint-disable-next-line new-cap
const router = require('express').Router()
const auth = require('../auth')
const Users = mongoose.model('Users')
// post request at /api/users/register, register the user
router.post('/register', auth.optional, async (req, res, next) => {
    const {
        body: { user },
    } = req

    if (!user.username) {
        return res.status(422).json({
            errors: 'username is required',
        })
    }

    if (!user.password) {
        return res.status(422).json({
            errors: 'password is required',
        })
    }

    const exist = await Users.findOne({username: user.username});
    if(exist) {

        return res.status(422).json({
            errors: 'username already taken',
        })
    }

    const finalUser = new Users(user)
    finalUser.spending = [];
    finalUser.isAdmin = false // normal users should not be admin.

    finalUser.setPassword(user.password)
    return finalUser
        .save()
        .then(() => res.json({ user: finalUser.generateAuthRes() }))
})

// post request at /api/users/login, login the user
router.post('/login', auth.optional, (req, res, next) => {
    const {
        body: { user },
    } = req

    if (!user.username) {
        return res.status(422).json({
            errors: 'username is required',
        })
    }

    if (!user.password) {
        return res.status(422).json({
            errors: 'password is required',
        })
    }

    // authenticate using passport
    return passport.authenticate(
        'local',
        { session: false },
        (err, passportUser, info) => {
            // error, pass the the next middleware
            if (err) return next(err)

            // user exists
            if (passportUser) {
                // return something to indicate success
                const user = passportUser
                user.token = passportUser.generateJWT()

                return res.json({ user: user.generateAuthRes() })
            }

            // authentication err
            return res.status(401).json(info)
        }
    )(req, res, next)
})

router.post('/addsubscriptioninfo', auth.required, (req, res, next) => {
    const {
        // eslint-disable-next-line camelcase
        body: { sub_info },
        payload: { _id },
    } = req

    Users.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).json({err: "User not found"});
        }

        user.addSubscription(sub_info)
        user.save().then(() => {
            return res.json({
                message: `Added subscription ${JSON.stringify(sub_info)}`,
                user: user.generateAuthRes(),
            })
        })
    }).catch(err => {
        return res.status(500).json({err: "User failed to save"});
    })
})

router.post('/removesubscriptioninfo', auth.required, (req, res, next) => {
    const {
        body: { index },
        payload: { _id },
    } = req

    Users.findById(_id).then((user) => {
        if(!user) {
            return res.status(404).json({err: "User not found"});
        }

        user.deleteSubscription(index);
        user.save().then(() => {
            return res.json({
                message: `Deleted subscription`,
                user: user.generateAuthRes()
            })
        }).catch(err => {
            return res.status(500).json({err: "User failed to delete"})
        });
    })
})

// get the subscription list of the current user
router.get('/getsublist', auth.required, (req, res, next) => {
    const {
        payload: { _id },
    } = req

    Users.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).json({err: "User not found"});
        }

        return res.json({
            subscriptions: user.subscriptions,
            user: user.generateAuthRes(),
        })
    }).catch(err => res.status(500).json({err: "Failed to find subscription list"}))
})

// return current user
router.get('/current', auth.required, (req, res, next) => {
    const {
        payload: { _id }, // remember that we signed the _id to the jwt
    } = req

    return Users.findById(_id).then((user) => {
        if (!user) {
            return res.status(404).json({err: "User not found"});
        }

        return res.json({ user: user.generateAuthRes() })
    })
})

// allow logged in user to delete their account
router.delete('/deleteaccount', auth.required, (req, res, next) => {
    const {
        payload: { username }, // remember that we signed the _id to the jwt
    } = req
    // const username = req.payload.username;
    // invalidate token

    Users.deleteOne({ username: username }, function (err) {
        if (err) return res.status(500).json({ message: 'deleteOne() failed' })
        else {
            return res.json({ message: 'Success' })
        }
    })
})

router.get('/monthly_spending', auth.required, (req, res) => {
    const {
        payload: {_id}
    } = req;

    Users.findById(_id).then(user => {
        if(!user) res.status(404).json({err: "User not found"});

        return res.json({spending: user.spending.slice(user.spending.length - 6)})
    })
})

router.get('/yearly_spending', auth.required, (req, res) => {
    const {
        payload: {_id}
    } = req;

    Users.findById(_id).then(user => {
        if(!user) res.status(404).json({err: "User not found"});
        if(user.spending.length == 0) return res.json({spending: [0]});

        let year = [];
        let curr = 0
        let count = 0;
        let prev = 0;
        for(let i = user.spending.length - 1; i >= 0; i--) {
            curr += user.spending[i];
            prev = user.spending[i];
            count++;
            if(count == 12) {
                year.push(curr);
                curr = 0;
                count = 0;
            }
        }

        while(count != 0) {
            curr += prev;
            count++;
            if(count == 12) {
                year.push(curr);
                curr = 0;
                count = 0;
            }
        }

        year.reverse();
        return res.json({spending: year});
    })
})

module.exports = router
