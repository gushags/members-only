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
    ORDER BY p.date_created DESC
    `
  );
  return rows;
}

async function createNewPost(title, message, userid) {
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

module.exports = { getAllPosts, createNewPost };
