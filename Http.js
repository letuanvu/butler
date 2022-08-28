const express = require('express');
const mongoose = require('mongoose');
const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const path = require("path");

/* routes include */
const indexPage = require('./routes/indexPage');
const loginPage = require('./routes/loginPage');

class Http {
	constructor() {
		this.app = express();
		this.setup();
		this.moutRoutes();
		Http.connectMongo();
	}

	static connectMongo() {
		try {
			mongoose.connect(process.env.MONGO_URI);
			console.log("Connected to Mongodb")			
		} catch (connectError) {
			console.error(connectError);
		}
	}

	moutRoutes() {
		this.app.use(indexPage);
		this.app.use(loginPage);
		this.app.use(function(req, res, next) {
		  	next(createError(404));
		});

		this.app.use(function(err, req, res, next) {
			// set locals, only providing error in development
			res.locals.message = err.message;
			res.locals.error = req.app.get("env") === "development" ? err : {};

			// render the error page
			res.status(err.status || 500);
			res.render("error");
		});
	}

	setup() {
		this.app.set("views", path.join(__dirname, "views"));
		this.app.set("view engine", "ejs");

		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: false }));
		this.app.use(cookieParser());
		this.app.use(express.static(path.join(__dirname, "public")));

		this.app.set('view engine', 'ejs');
		this.app.use(
		  	"/script-adminlte",
		  	express.static(path.join(__dirname, "/node_modules/admin-lte/"))
		);
	}

	getApp() {
		return this.app;
	}

}

module.exports = Http;
