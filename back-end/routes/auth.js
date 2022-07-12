const jwt = require("express-jwt");
require("dotenv").config({ silent: true });

const JWT_SECRET = process.env.JWT_SECRET;

// find the JWT token from the header
const getTokenFromHeaders = (req) => {
	const {
		headers: { authorization },
	} = req;

	// find authorization header and split the content
	if (authorization && authorization.split(" ")[0] === "Token") {
		// found token
		return authorization.split(" ")[1];
	}

	return null;
};

const auth = {
	// see jwt express documentation
	required: jwt({
		secret: JWT_SECRET,
		userProperty: "payload",
		getToken: getTokenFromHeaders,
		algorithms: ["HS256"],
	}),
	optional: jwt({
		secret: JWT_SECRET,
		userProperty: "payload",
		getToken: getTokenFromHeaders,
		algorithms: ["HS256"],
		credentialsRequired: false,
	}),
};

module.exports = auth;
