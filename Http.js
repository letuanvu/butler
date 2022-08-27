const express = require('express');

class Http {
	constructor() {
		this.express = express();
		this.mountRoutes();
	}

	mountRoutes() {
		this.express.get('/', (req, res) => {
			res.send('this is bulter of my house!');
		})
	}

	getApp() {
		return this.express;
	}

}

module.exports = Http;
