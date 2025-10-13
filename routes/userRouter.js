// routes/userRouter.js

const { Router } = require('express');
const { findUserByEmailControl } = require('../controllers/userController');

const userRouter = new Router();

userRouter.get('/', findUserByEmailControl);

module.exports = userRouter;
