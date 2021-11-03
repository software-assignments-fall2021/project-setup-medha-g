const express = require("express");
const path = require("path");
const session = require("express-session");
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("errorhandler");
require("dotenv").config({ silent: true });

mongoose.promise = global.Promise;

const isProduction = process.env.NODE_ENV === "production";
const DB_ADDR = process.env.DB_ADDR;
const SESSION_SECRET = process.env.SESSION_SECRET;

const app = express();

// configure the app
app.use(cors());
app.use(require("morgan")("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(
	session({
		secret: "SESSION_SECRET",
		cookie: { maxAge: 60000 },
		resave: false,
		saveUninitialized: false,
	})
);
if (!isProduction) app.use(errorHandler());

// connect to temporary mongodb ran on local machine
mongoose.connect(DB_ADDR);
if (!isProduction) mongoose.set("debug", true);

// Models and Routers
require("./models/users");
require("./config/passport");
app.use(require("./routes"));

module.exports = app;
