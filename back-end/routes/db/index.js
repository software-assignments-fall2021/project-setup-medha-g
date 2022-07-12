const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/maintenance", require("./maintenance"));

module.exports = router;