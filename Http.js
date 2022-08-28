const express = require('express');
const mongoose = require('mongoose');

/* routes include */
const indexPage = require('./routes/indexPage');
const loginPage = require('./routes/loginPage');

class Http {
	constructor() {
		this.express = express();
		this.express.set('view engine', 'ejs');
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
		this.express.use(indexPage);
		this.express.use(loginPage);
	}

	getApp() {
		return this.express;
	}

}

module.exports = Http;
