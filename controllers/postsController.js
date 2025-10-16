// controllers/postsController.js

const Post = require('../db/Post');

async function getAllPostsControl(req, res) {
  const posts = await Post.getAll();
  res.render('index', {
    posts: posts,
  });
}

async function createNewPostControl(req, res) {
  const user = req.user;
  const { title, message } = req.body;
  try {
    await Post.create(title, message, user.user_id);
    res.redirect('/');
  } catch (err) {
    console.error(err);
    next(err);
  }
}

async function deletePostControl(req, res) {
  const { id } = req.params;

  console.log('Post ID', id);
  await Post.delete(id);
  res.redirect('/');
}

module.exports = {
  getAllPostsControl,
  createNewPostControl,
  deletePostControl,
};
