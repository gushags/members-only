// config/passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../db/User');

passport.use(
  new LocalStrategy(
    { usernameField: 'username' },
    async (username, password, done) => {
      try {
        const user = await User.findByEmail(username);
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }

        const isValid = await User.validatePassword(user, password);
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
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
