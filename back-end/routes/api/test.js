// eslint-disable-next-line new-cap
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const auth = require("../auth");
require("dotenv").config({ silent: true });

const JWT_SECRET = process.env.JWT_SECRET;

router.get("/checkup", auth.optional, (req, res) => {
	res.json({ message: "If you see this, the server is up" });
});

router.get("/checkAuthorize", auth.optional, (req, res) => {
	const {
		body: { token },
	} = req;

	try {
		// eslint-disable-next-line no-unused-vars
		const payload = jwt.verify(token, JWT_SECRET);
		res.json({ message: "If you see this mesasage you are authorized." });
	} catch (err) {
		console.log(err);
		res.json({ message: "If you see this mesasage you are not authorized." });
	}
});

module.exports = router;
