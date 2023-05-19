const { Router } = require('express');
const router = Router();

// Middleware to check if user is authenticated
const isAuthenticated = (req, res, next) => {
  return req.isAuthenticated() ? next() : res.redirect('/auth/login');
};

router.get('/dashboard', isAuthenticated, (req, res) => {
  res.json({ message: "Welcome to the dashboard."});
});

router.post('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  });
});

module.exports = router;
