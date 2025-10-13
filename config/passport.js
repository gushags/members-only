// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {
  findUserByEmail,
  findUserById,
  validatePassword,
} = require('../db/userQueries');

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      try {
        const user = await findUserByEmail(username);
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
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user.user_id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await findUserById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
