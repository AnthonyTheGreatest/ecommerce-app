const { Router } = require('express');
const router = Router();
const passport = require('passport');
const { config } = require('../3_controllers/auth');
config(passport);

router.post(
    '/signup',
    passport.authenticate(
        'local-signup',
        {
            // TODO: Create failureRedirect route with GET.
            failureRedirect: '/auth/signup',
            failureMessage: true //  The failureMessage option will add the message to req.session.messages.
        }
    ),
    (req, res) => {
        res.json({ user: req.user });
        // res.redirect('/auth/login'); // post method?
    }
);

router.post(
    '/login',
    passport.authenticate(
        'local-login',
        {
            // TODO: Create failureRedirect route with GET.
            failureRedirect: '/auth/login',
            failureMessage: true //  The failureMessage option will add the message to req.session.messages.
        }
    ),
    (req, res) => {
        res.json({ user: req.user });
        // res.redirect('/~' + req.user.user_name);
        // or
        // res.redirect('users/dashboard');
    }
);

module.exports = router;
