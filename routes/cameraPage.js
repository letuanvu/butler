const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/camera', authenticate, (req, res) => {
    res.render('camera', { title: "Camera", user: req.session.user});
});

module.exports = router;
