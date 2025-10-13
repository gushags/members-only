// database/userQueries.js

const pool = require('./pool');
const bcrypt = require('bcrypt');

async function createUser(first_name, last_name, email, password, isadmin) {
  const hashedPassword = await bcrypt.hash(password, 10);
  const { rows } = await pool.query(
    'INSERT INTO users (first_name, last_name, email, hashed_pwd, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [first_name, last_name, email, hashedPassword, isadmin]
  );
  return rows[0];
}

async function findUserByEmail(email) {
  const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
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
  findUserByEmail,
  findUserById,
  validatePassword,
};
