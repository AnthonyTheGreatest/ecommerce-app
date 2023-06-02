import express from 'express';
const app = express();
import dotenv from 'dotenv';
dotenv.config();
import morgan from 'morgan';
import passport from 'passport';
import session from 'express-session';
import memorystore from 'memorystore';
const MemoryStore = memorystore(session); // Storage for session data (for development and testing purposes).
import helmet from 'helmet';
import authRouter from './4_routes/auth.js';
import userRouter from './4_routes/user.js';

const port = process.env.PORT || 3001;

// Helmet helps secure Express apps by setting HTTP response headers.
app.use(helmet());

// HTTP request logger middleware
app.use(morgan('tiny'));  // (:method :url :status :res[content-length] - :response-time ms)

// Configure express middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configure express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET ?? 'default-secret',
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
