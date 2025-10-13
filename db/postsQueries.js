// db/postsQueries.js

const pool = require('./pool');

async function getAllPosts() {
  const { rows } = await pool.query(
    `
    SELECT u.email, u.first_name, u.last_name, p.title, p.message, p.date_created
    FROM users_posts AS up
    JOIN users AS u
      ON u.user_id = up.user_id
    JOIN posts AS p
      ON p.post_id = up.post_id
    ORDER BY p.date_created
    `
  );
  return rows;
}

module.exports = { getAllPosts };
