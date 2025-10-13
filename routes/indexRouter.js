// routes/indexRouter.js

const { Router } = require('express');
const { getAllPostsControl } = require('../controllers/postsController');

const indexRouter = new Router();

// basic route to start
indexRouter.get('/', getAllPostsControl);

module.exports = indexRouter;
