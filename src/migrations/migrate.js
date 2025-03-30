const { Client } = require('pg');
const { createUsersTable, createArticlesTable, createCommentsTable } = require('./tables');

async function runMigrations() {
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    await client.connect();
    console.log('Conectado ao banco de dados.');

    await client.query(createUsersTable);
    console.log('Tabela de usuários criada.');

    await client.query(createArticlesTable);
    console.log('Tabela de artigos criada.');

    await client.query(createCommentsTable);
    console.log('Tabela de comentários criada.');

    console.log('Migrações concluídas com sucesso.');
  } catch (err) {
    console.error('Erro ao executar migrações:', err);
  } finally {
    await client.end();
  }
}

runMigrations();
