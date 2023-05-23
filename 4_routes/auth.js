import { Router } from 'express';
const router = Router();
import passport from 'passport';
import config from '../3_controllers/auth.js';
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

export default router;
