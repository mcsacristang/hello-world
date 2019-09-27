const router = require('express').Router();
const passport = require('passport');

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', passport.authenticate('google', {
  scope: ['profile','email']
}));

router.get('/google/redirect', passport.authenticate('google', { failureRedirect: '/error' }), (req, res) => {
  res.redirect('/dashboard');
});

router.get('/outlook', passport.authenticate('windowslive', {
  scope: [
    'openid',
    'profile',
    'offline_access',
    'https://outlook.office.com/Mail.Read'
    ]
}));

router.get('/outlook/redirect', passport.authenticate('windowslive', { failureRedirect: '/error' }), (req, res) => {
  res.redirect('/dashboard');
});

module.exports = router;
