const createArticlesTable = `CREATE TABLE IF NOT EXISTS articles (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    content TEXT NOT NULL,
    author VARCHAR(50) NOT NULL,
    tags VARCHAR(255)[],
    created_at TIMESTAMPTZ DEFAULT NOW()
  );`;