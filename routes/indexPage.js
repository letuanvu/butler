const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, (req, res) => {
	res.render('index', { title: "Express" });
});

module.exports = router;
