// app.js

const express = require('express');
const path = require('node:path');
const session = require('express-session');
const passport = require('passport');
const pgPool = require('./db/pool');

// Gives us access to variables set in the .env file via `process.env.VARIABLE_NAME` syntax
require('dotenv').config();

// Use postgresql package to connect passport session
const pgSession = require('connect-pg-simple')(session);

// Need to require the entire Passport config module so app.js knows about it
require('./config/passport');

// Create the Express application
const app = express();

// Allow data to be read from req.body
app.use(express.urlencoded({ extended: true }));

// Get application ready to use ejs templates
// from 'views' folder
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Get app ready to serve static files from public
// like css and images
const assetsPath = path.join(__dirname, 'public');
app.use(express.static(assetsPath));

/**
 * -------------- SESSION SETUP ----------------
 *  (from connect-pg-simple docs)
 */

app.use(
  session({
    store: new pgSession({
      pool: pgPool, // Connection pool
      tableName: 'session', // Use another table-name than the default "session" one
      // Insert connect-pg-simple optcions here
    }),
    secret: process.env.SECRET || 'brain cats',
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 30 * 24 * 60 * 60 * 1000 }, // 30 days
    // Insert express-session options here
  })
);

/**
 * -------------- PASSPORT AUTHENTICATION ----------------
 */

app.use(passport.initialize());
app.use(passport.session());

// app.use((req, res, next) => {
//   console.log(req.session);
//   console.log(req.user);
//   next();
// });

/**
 * -------------- ROUTERS ----------------
 */
const indexRouter = require('./routes/indexRouter');

/**
 * -------------- ROUTES ----------------
 */
app.use('/', indexRouter);

// TODO

/**
 * -------------- SERVER ----------------
 */

// // routers
// const indexRouter = require('./routes/indRouter');
// const newRouter = require('./routes/newRouter');
// const categoryRouter = require('./routes/categoryRouter');

// // Routers
// app.use('/new', newRouter);
// app.use('/categories', categoryRouter);
// app.use('/', indexRouter);

// Errorhandling router
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).render('error', {
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err : {},
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, (error) => {
  // This is important!
  // Without this, any startup errors will silently fail
  // instead of giving you a helpful error message.
  if (error) {
    throw error;
  }
  console.log(`Node-Inventory app - listening on port ${PORT}!`);
});
