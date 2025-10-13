// controllers/postsController.js

const db = require('../db/postsQueries');

async function getAllPostsControl(req, res) {
  const posts = await db.getAllPosts();
  res.render('index', {
    posts: posts,
  });
}

module.exports = { getAllPostsControl };
