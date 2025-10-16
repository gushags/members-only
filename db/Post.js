// db/postsQueries.js

const pool = require('./pool');

class Post {
  async getAll() {
    const { rows } = await pool.query(
      `
    SELECT u.user_id,
           u.email,
           u.first_name,
           u.last_name,
           p.title,
           p.message,
           p.date_created,
           p.post_id
    FROM users_posts AS up
    JOIN users AS u
      ON u.user_id = up.user_id
    JOIN posts AS p
      ON p.post_id = up.post_id
    ORDER BY p.date_created DESC
    `
    );
    return rows;
  }
  async create(title, message, userid) {
    const result = await pool.query(
      `
    INSERT INTO posts (title, message)
    VALUES ($1, $2)
    RETURNING post_id
    `,
      [title, message]
    );
    const postid = result.rows[0].post_id;
    await pool.query(
      `
    INSERT INTO users_posts (user_id, post_id)
    VALUES ($1, $2)
    `,
      [userid, postid]
    );
  }
  async delete(id) {
    await pool.query(
      `
    DELETE FROM users_posts WHERE post_id = $1
    `,
      [id]
    );
    await pool.query(
      `
    DELETE FROM posts WHERE post_id = $1
    `,
      [id]
    );
  }
}

module.exports = new Post();
