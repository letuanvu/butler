const express = require('express');
const router = express.Router();
const User = require('../models/userSchema');
const md5 = require('md5');

router.get('/login', (req, res) => {
    if (req.session.user) return res.redirect('/');
    res.render('login', {message: req.flash('error')});
});

router.post('/login', async (req, res) => {
    if (req.session.user) return res.redirect('/');
    const {email, password} = req.body;
    const user = await User.findOne({email: email, password: md5(password)});
    if (!!user) {
        req.session.user = user;
        return res.redirect('/');
    } else {
        req.flash('error', 'Login failed, please try again!');
    }
    res.redirect('/login');
})

module.exports = router;
