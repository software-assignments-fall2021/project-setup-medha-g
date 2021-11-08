const mongoose = require("mongoose");
const passport = require("passport");
const router = require("express").Router();
const auth = require("../auth");
const Users = mongoose.model("Users");
// post request at /api/users/register, register the user
router.post("/register", auth.optional, (req, res, next) => {
	const {
		body: { user },
	} = req;

	if (!user.username) {
		return res.status(422).json({
			errors: {
				username: "is required",
			},
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: "is required",
			},
		});
	}

	const finalUser = new Users(user);

	finalUser.setPassword(user.password)
	return finalUser
		.save()
		.then(() => res.json({ user: finalUser.generateAuthRes() }));
});

// post request at /api/users/login, login the user
router.post("/login", auth.optional, (req, res, next) => {
	const {
		body: { user },
	} = req;

	if (!user.username) {
		return res.status(422).json({
			errors: {
				username: "is required",
			},
		});
	}

	if (!user.password) {
		return res.status(422).json({
			errors: {
				password: "is required",
			},
		});
	}

	// authenticate using passport
	return passport.authenticate(
		"local",
		{ session: false },
		(err, passportUser, info) => {
			// error, pass the the next middleware
			if (err) return next(err);

			// user exists
			if (passportUser) {
				// return something to indicate success
				const user = passportUser;
				user.token = passportUser.generateJWT();

				return res.json({ user: user.generateAuthRes() });
			}

			// authentication err
			return res.status(400).send(info);
		}
	)(req, res, next);
});
router.post("/subscriptioninfo",auth.required, (req) => {
	const {
		body: {sub_info},
		payload: {_id},
	}= req;
	const user = Users.findById(_id)
	user.addSubscription(sub_info.name, sub_info.cost, sub_info.per_time_unit)
});
// return current user
router.get("/current", auth.required, (req, res, next) => {
	const {
		payload: { _id }, // remember that we signed the _id to the jwt
	} = req;

	return Users.findById(_id).then((user) => {
		if (!user) {
			return res.sendStatus(400);
		}

		return res.json({ user: user.generateAuthRes() });
	});
});

module.exports = router;
