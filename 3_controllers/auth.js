const LocalStrategy = require('passport-local');
const moment = require('moment');
const auth = require('../2_dataAccess/auth');

// constructor(data = {}) {
//     this.created = data.created || moment.utc().toISOString();
//     this.description = data.description;
//     this.modified = moment.utc().toISOString();
//     this.name = data.name;
//     this.price = data.price || 0;
//     this.productId = data.id;
//     this.qty = data.qty || 1;
//     this.orderId = data.orderId || null;
//   }

const config = (passport) => {
    // Signup:
    passport.use(
        'local-signup',
        new LocalStrategy(
            {
                usernameField: 'email',
                passwordField: 'password',
                passReqToCallback: true // Allows passing additional fields to the callback from the request body.
            },
            async (req, email, password, cb) => {
                const { user_name } = req.body;
                created = created || moment.utc().toISOString();
                try {
                    const userExists = await auth.emailExists(email);
                    if (userExists) return cb(null, false, { message: 'Email already in use.' });
                    const user = await auth.createUser(email, password, user_name);
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
            async (email, password, cb) => {
                try {
                    const user = await auth.emailExists(email);
                    if (!user) return cb(null, false, { message: 'Incorrect email.' });
                    const isMatch = await auth.matchPassword(password, user.password);
                    if (!isMatch) return cb(null, false, { message: 'Incorrect password.' });
                    return cb(null, user);
                } catch (error) {
                    return cb(error);
                }
            }
        )
    );
    // Serialization:
    passport.serializeUser((user, cb) => {
        cb(null, user.id);
    });
    // Deserialization:
    // (req.user)
    passport.deserializeUser(async (id, cb) => {
        const user = await auth.userById(id);
        cb(null, user);
    });
    // ?
    return passport;
};

module.exports = {
    config
    // Exported to:
};
