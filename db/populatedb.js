// db/populatedb.js

require('dotenv').config();

const { Client } = require('pg');

const { PGPOSTGRESQLURL } = process.env;

const SQL = `
DROP TABLE IF EXISTS session;
DROP TABLE IF EXISTS users_posts;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS posts;

CREATE TABLE session (
    sid VARCHAR NOT NULL COLLATE "default",
    sess JSON NOT NULL,
    expire TIMESTAMP(6) NOT NULL
    )
WITH (OIDS=FALSE);

CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    email VARCHAR(255) NOT NULL,
    first_name VARCHAR(255) NOT NULL,
    last_name VARCHAR(255) NOT NULL,
    user_pwd VARCHAR(255) NOT NULL,
    isadmin BOOLEAN DEFAULT FALSE
);
ALTER SEQUENCE users_user_id_seq RESTART WITH 101;

CREATE TABLE posts (
    post_id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message VARCHAR NOT NULL,
    date_created TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP
);
ALTER SEQUENCE posts_post_id_seq RESTART WITH 201;

CREATE TABLE users_posts (
  user_id INT REFERENCES users(user_id),
  post_id INT REFERENCES posts(post_id),
  PRIMARY KEY (user_id, post_id)
);

INSERT INTO users (email, first_name, last_name, user_pwd, isadmin)
    VALUES
    ('jeff@example.com', 'Jeff', 'Hubert', 'irish', true),
    ('amber@mac.com', 'Amber', 'Wheels', 'irish', false),
    ('nora@ucsd.edu', 'Nora', 'Hagkull', 'irish', false)
    ;

INSERT INTO posts (title, message)
    VALUES
        ('First post', 'This is the text of the first post. Pretty boring!'),
        ('Second post', 'This is the second post. If anything, it is more boring.'),
        ('Third post', 'This is the third post. It is short.');

INSERT INTO users_posts (user_id, post_id)
    VALUES
        (101, 201),
        (102, 202),
        (101, 203);
`;

async function main() {
  console.log('seeding...');
  const client = new Client({
    connectionString: PGPOSTGRESQLURL, // Local is: 'postgresql://jeff@localhost:5432/members'
  });

  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log('done');
}

main();
