const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/api", require("./api"));
router.use("/db", require("./db"));

module.exports = router;
