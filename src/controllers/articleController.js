const Article = require('../models/Article');

// Criar um novo artigo
async function createArticle(req, res) {
  try {
    const { title, content, author, tags } = req.body;
    const article = await Article.create({ title, content, author, tags });
    res.status(201).json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Obter todos os artigos
async function getAllArticles(req, res) {
  try {
    const articles = await Article.findAll();
    res.json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// Atualizar um artigo
async function updateArticle(req, res) {
  try {
    const { id } = req.params;
    const { title, content, author, tags } = req.body;
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    article.title = title;
    article.content = content;
    article.author = author;
    article.tags = tags;
    await article.save();

    res.json(article);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Deletar um artigo
async function deleteArticle(req, res) {
  try {
    const { id } = req.params;
    const article = await Article.findByPk(id);
    if (!article) return res.status(404).json({ error: 'Article not found' });

    await article.destroy();
    res.json({ message: 'Article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = { createArticle, getAllArticles };
