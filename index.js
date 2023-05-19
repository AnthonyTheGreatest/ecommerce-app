const express = require('express');
const app = express();
require('dotenv').config();
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const MemoryStore = require('memorystore')(session); // Storage for session data (for development and testing purposes).
const authRouter = require('./auth');
const userRouter = require('./user');

const port = process.env.PORT || 3001;

// HTTP request logger middleware
app.use(morgan('tiny'));  // (:method :url :status :res[content-length] - :response-time ms)

// Configure express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 300000000, secure: false },
    store: new MemoryStore({
        checkPeriod: 86400000 // prune expired entries every 24h
      })
  }));

// Configure passport middleware
// Must come after express-session middleware configuration.
// (req.user; req.isAuthenticated(); req.logout();)
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
    res.send('Welcome to the home page.');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);

app.listen(port, () => {
    console.log(`(Ctrl+click =>) http://localhost:${port}`)
});
