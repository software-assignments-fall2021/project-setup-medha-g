const express = require("express");
// eslint-disable-next-line new-cap
const router = express.Router();

router.use("/users", require("./users"));
router.use("/test", require("./test"));
router.use("/plaid", require("./plaid"));
router.use("/parsetrans", require("./parsetrans"));

module.exports = router;
