// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  findUserByUsername,
  findUserById,
  validatePassword,
} = require('../db/userQueries');

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await findUserByUsername(username);
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }

      const isValid = await validatePassword(user, password);
      if (!isValid) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
