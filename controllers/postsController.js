// controllers/postsController.js

const db = require('../db/postsQueries');

async function getAllPostsControl(req, res) {
  const posts = await db.getAllPosts();
  console.log(posts);
  res.render('index');
}

module.exports = { getAllPostsControl };
