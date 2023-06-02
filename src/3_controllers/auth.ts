import {Strategy as LocalStrategy } from 'passport-local';
import * as dataAccess from '../2_dataAccess/auth.js';

const config = (passport: any) => {
    // Signup:
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // Allows passing additional fields to the callback from the request body.
            },
            async (req, email: string, password: string, cb: any) => {
                const { user_name } = req.body;
                try {
                    const userExists = await dataAccess.emailExists(email);
                    if (userExists) return cb(null, false, { message: 'Email already in use.' });
                    const user = await dataAccess.createUser(email, password, user_name);
                    return cb(null, user);
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );
    // Login:
    passport.use(
        'local-login',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password'
            },
            async (email: string, password: string, cb: any) => {
                try {
                    const user = await dataAccess.emailExists(email);
                    if (!user) return cb(null, false, { message: 'Incorrect email.' });
                    const isMatch = await dataAccess.matchPassword(password, user.password);
                    if (!isMatch) return cb(null, false, { message: 'Incorrect password.' });
                    return cb(null, user);
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );
    // Serialization:
    passport.serializeUser((user: any, cb: any) => {
        cb(null, user.id);
    });
    // Deserialization:
    // (req.user)
    passport.deserializeUser(async (id: string, cb: any) => {
        const user = await dataAccess.userById(id);
        cb(null, user);
    });
    // ?:
    return passport;
};

export default config;
