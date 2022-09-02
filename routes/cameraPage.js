const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.get('/camera', (req, res) => {
    res.render('camera', { title: "Express", user: {email: 'yesy'}});
});

module.exports = router;
