// database/userQueries.js

const pool = require('./pool');
const bcrypt = require('bcrypt');

class User {
  async create(first_name, last_name, email, password, isadmin) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const { rows } = await pool.query(
      'INSERT INTO users (first_name, last_name, email, hashed_pwd, isadmin) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [first_name, last_name, email, hashedPassword, isadmin]
    );
    return rows[0];
  }
  async findByEmail(email) {
    const { rows } = await pool.query('SELECT * FROM users WHERE email = $1', [
      email,
    ]);
    return rows[0];
  }
  async findById(id) {
    const { rows } = await pool.query(
      'SELECT * FROM users WHERE user_id = $1',
      [id]
    );
    return rows[0];
  }
  async validatePassword(user, password) {
    return bcrypt.compare(password, user.hashed_pwd);
  }
  async updateToMember(id) {
    await pool.query('UPDATE users SET ismember = TRUE WHERE user_id = $1', [
      id,
    ]);
  }
}

module.exports = new User();
