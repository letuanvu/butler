const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/', authenticate, (req, res) => {
	res.render('index', { title: "Dashboard", user: req.session.user});
});

module.exports = router;
