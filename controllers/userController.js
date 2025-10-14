// controllers/userController.js

const db = require('../db/userQueries');

async function findUserByEmailControl(req, res) {
  // if logged in, go to user page? Where is this information?
  res.render('user');
}

async function createNewUserControl(req, res, next) {
  const { firstname, lastname, email, password, isadmin } = req.body;
  console.log(req.body);
  try {
    await db.createUser(firstname, lastname, email, password, isadmin);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    res.redirect('/signup');
  }
}

module.exports = { findUserByEmailControl, createNewUserControl };
