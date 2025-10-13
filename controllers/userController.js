// controllers/userController.js

const { findUserByEmail } = require('../db/userQueries');

async function findUserByEmailControl(req, res) {
  // if logged in, go to user page? Where is this information?
  res.render('user');
}

module.exports = { findUserByEmailControl };
