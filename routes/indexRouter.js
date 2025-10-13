// routes/indexRouter.js

const { Router } = require('express');
const { getAllPostsControl } = require('../controllers/postsController');

const indexRouter = new Router();

// routes and controllers
indexRouter.get('/', getAllPostsControl);

module.exports = indexRouter;
