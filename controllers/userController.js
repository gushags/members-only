// controllers/userController.js

const User = require('../db/User');
const { validationResult } = require('express-validator');

async function findUserByEmailControl(req, res) {
  // if logged in, go to user page? Where is this information?
  res.render('user');
}

async function createNewUserControl(req, res, next) {
  const { firstname, lastname, email, password, isadmin } = req.body;
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).render('signup', {
        title: 'Sign Up',
        errors: errors.array(),
        data: req.body,
      });
    }
    await User.create(firstname, lastname, email, password, isadmin);
    res.redirect('/login');
  } catch (err) {
    console.error(err);
    next(err); // let Express handle error
  }
}

async function createNewMemberControl(req, res, next) {
  const { userid, memberpwd } = req.body;
  try {
    if (memberpwd === 'BlueDonkey') {
      await User.updateToMember(userid);
      res.redirect('/member');
    } else {
      req.flash('errormsg', 'That password is incorrect. Try again.');
      res.redirect('/login/success');
    }
  } catch (err) {
    console.error(err);
    next(err); // let Express handle error
  }
}

module.exports = {
  findUserByEmailControl,
  createNewUserControl,
  createNewMemberControl,
};
