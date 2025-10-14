// routes/indexRouter.js

const { Router } = require('express');
const { getAllPostsControl } = require('../controllers/postsController');
const { createNewUserControl } = require('../controllers/userController');

const indexRouter = new Router();

// routes and controllers
indexRouter.get('/', getAllPostsControl);
indexRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
indexRouter.get('/signup', (req, res) => {
  res.render('signup');
});

indexRouter.post('/signup', createNewUserControl);

module.exports = indexRouter;
