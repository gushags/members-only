// validators/userValidators.js

const { body } = require('express-validator');
const db = require('../db/userQueries');

const validateNewUser = [
  body('firstname')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isAlpha()
    .withMessage('Only letters are allowed in names'),
  body('lastname')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isAlpha()
    .withMessage('Only letters are allowed in names'),
  body('email')
    .isEmail()
    .withMessage('Valid email required')
    .custom(async (value) => {
      const user = await db.findUserByEmail(value);
      if (user) {
        throw new Error('E-mail already in use');
      }
    }),
  body('password')
    .isLength({ min: 5 })
    .withMessage('Password must be at least 5 characters'),
  body('password-confirm')
    .custom((value, { req }) => {
      return value === req.body.password;
    })
    .withMessage('Passwords must match'),
];

module.exports = { validateNewUser };
