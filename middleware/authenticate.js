const User = require('../models/userSchema');

const authenticate = (req, res, next) => {
    console.log(req.session.user);
    if (!req.session.user) {
        req.flash('error', 'Not authorized! Go back!');
        return res.redirect('/login');
    }

    User.findById(req.session.user._id).exec((error, user) => {
        if (error) {
            req.flash('error', error.message);
            return res.redirect('/login');
        } else {
            if (user === null) {
                req.flash('error', 'Not authorized! Go back!');
                return res.redirect('/login');
            } else {
                return next();
            }
        }
    });
}

module.exports = authenticate;