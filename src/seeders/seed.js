const { Client } = require('pg');
const { userSeeder, articleSeeder } = require('./data');

async function runSeeders() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados.');

    for (const user of userSeeder) {
      await client.query(
        'INSERT INTO users (id, username, password) VALUES ($1, $2, $3) ON CONFLICT (id) DO NOTHING',
        [user.id, user.username, user.password]
      );
      console.log(`Usuário ${user.username} inserido.`);
    }

    for (const article of articleSeeder) {
      await client.query(
        'INSERT INTO articles (id, title, content, author, tags) VALUES ($1, $2, $3, $4, $5) ON CONFLICT (id) DO NOTHING',
        [article.id, article.title, article.content, article.author, article.tags]
      );
      console.log(`Artigo ${article.title} inserido.`);
    }

    console.log('Seeders executados com sucesso.');
  } catch (err) {
    console.error('Erro ao executar seeders:', err);
  } finally {
    await client.end();
  }
}

runSeeders();
