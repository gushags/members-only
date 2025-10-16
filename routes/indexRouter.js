// routes/indexRouter.js

const { Router } = require('express');
const {
  getAllPostsControl,
  createNewPostControl,
  deletePostControl,
} = require('../controllers/postsController');
const {
  createNewUserControl,
  createNewMemberControl,
} = require('../controllers/userController');
const { validateNewUser } = require('../validators/userValidators');

const indexRouter = new Router();

// routes and controllers

/**
 * --------- GET routes -----------
 */
indexRouter.get('/', getAllPostsControl);
indexRouter.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});
indexRouter.get('/signup', (req, res) => {
  res.render('signup', { data: null });
});

indexRouter.get('/member', (req, res) => {
  res.render('member');
});

/**
 *  ------- POST routes ------------
 */
indexRouter.post('/signup', validateNewUser, createNewUserControl);
indexRouter.post('/member', createNewMemberControl);
indexRouter.post('/newpost', createNewPostControl);

/**
 * -------- DELETE routes ---------
 */
indexRouter.delete('/delete/post/:id', deletePostControl);

module.exports = indexRouter;
