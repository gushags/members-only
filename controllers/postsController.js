// controllers/postsController.js

const db = require('../db/postsQueries');

async function getAllPostsControl(req, res) {
  const posts = await db.getAllPosts();
  res.render('index', {
    posts: posts,
  });
}

async function createNewPostControl(req, res) {
  const user = req.user;
  const { title, message } = req.body;
  try {
    await db.createNewPost(title, message, user.user_id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
}

module.exports = { getAllPostsControl, createNewPostControl };
