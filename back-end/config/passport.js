const mongoose = require("mongoose");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const Users = mongoose.model("Users");

// define local authentication strategy
passport.use(
	new LocalStrategy(
		{
			usernameField: "user[username]", // looking for username and password
			passwordField: "user[password]",
		},
		(username, password, done) => {
			// find username in our data base
			Users.findOne({ username: username })
				.then((user) => {
					if (!user || !user.validatePassword(password)) {
						// username not found or invalid password
						return done(null, false, {
							errors: "username or password is invalid"
						});
					}

					// success authentication
					return done(null, user);
				})
				.catch(done);
		}
	)
);
