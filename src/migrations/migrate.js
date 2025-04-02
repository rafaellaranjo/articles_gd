const { Client } = require('pg');
const createUsersTable = require('./create_users_table');
const createArticlesTable = require('./create_articles_table');
const createCommentsTable = require('./create_comments_table');
const userSeeder = require('../seeders/userSeeder');
const articleSeeder = require('../seeders/articleSeeder');
const commentSeeder = require('../seeders/commentSeeder');
const bcrypt = require('bcrypt');

const client = new Client({
  connectionString: process.env.DATABASE_URL,
});

async function migrate() {
  try {
    await client.connect();
    console.log('Connected to the database.');

    // Executando as migrações
    await client.query(createUsersTable);
    await client.query(createArticlesTable);
    await client.query(createCommentsTable);

    // Inserindo dados iniciais (seeders)
    for (const user of userSeeder) {
      const hashedPassword = await bcrypt.hash(user.password, 10);
      await client.query('INSERT INTO users (id, username, email, password) VALUES ($1, $2, $3, $4)', [user.id, user.username, user.email, hashedPassword]);
    }

    for (const article of articleSeeder) {
      await client.query('INSERT INTO articles (id, title, content, author, tags) VALUES ($1, $2, $3, $4, $5)', 
        [article.id, article.title, article.content, article.author, article.tags]);
    }

    for (const comment of commentSeeder) {
      await client.query('INSERT INTO comments (id, article_id, content, author) VALUES ($1, $2, $3, $4)', 
        [comment.id, comment.articleId, comment.content, comment.author]);
    }

    console.log('Migration and seeding completed!');
  } catch (err) {
    console.error('Migration error:', err);
  } finally {
    await client.end();
  }
}

migrate();
