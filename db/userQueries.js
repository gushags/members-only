// database/userQueries.js

const pool = require('./pool');
const bcrypt = require('bcrypt');

async function createUser(username, email, password) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    'INSERT INTO users (username, email, password) VALUES ($1, $2, $3) RETURNING *',
    [username, email, hashedPassword]
  );
  return rows[0];
}

async function findUserByUsername(username) {
  const { rows } = await pool.query('SELECT * FROM users WHERE username = $1', [
    username,
  ]);
  return rows[0];
}

async function findUserById(id) {
  const { rows } = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
  return rows[0];
}

async function validatePassword(user, password) {
  return bcrypt.compare(password, user.password);
}

module.exports = {
  createUser,
  findUserByUsername,
  findUserById,
  validatePassword,
};
