// routes/loginRouter.js

const { Router } = require('express');
const passport = require('passport');

const loginRouter = new Router();

loginRouter.get('/', (req, res) => {
  res.render('login');
});

loginRouter.get('/success', (req, res) => {
  res.render('success');
});

loginRouter.post(
  '/',
  passport.authenticate('local', {
    successRedirect: '/login/success',
    failureRedirect: '/login',
    failureFlash: true,
  })
);

module.exports = loginRouter;
