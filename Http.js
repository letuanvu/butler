const express = require('express');
const index = require('./routes/index')

class Http {
	constructor() {
		this.express = express();
		this.express.set('view engine', 'ejs');
		this.express.use('/', index);
	}

	getApp() {
		return this.express;
	}

}

module.exports = Http;
