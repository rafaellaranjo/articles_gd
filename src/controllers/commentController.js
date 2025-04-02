const Comment = require('../models/Comment');

// Adicionar um novo comentário
async function addComment(req, res) {
  try {
    const { content, author, articleId } = req.body;

    if (!content || !articleId || !author) {
      return res.status(400).json({ 
        error: 'Todos os campos são obrigatórios' 
      });
    }

    const comment = await Comment.create({ content, author, article_id: articleId });
    res.status(201).json(comment);
  } catch (err) {
    if (err.name === 'Validation error') {
      const errors = Object.values(err.errors).map(el => el.message);
      return res.status(400).json({ error: errors.join(', ') });
    }
    res.status(500).json({ error: err.message });
  }
}

// Deletar um comentário
async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByPk(id);
    if (!comment) return res.status(404).json({ error: 'Comment not found' });

    await comment.destroy();
    res.json({ message: 'Comment deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

async function getCommentsArticle(req, res) {
  try {
    const { articleId } = req.query;

    if (!articleId) {
      return res.status(400).json({ message: "Article ID is required" });
    }
    const comment = await Comment.findAll({ where: { article_id: articleId} });
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

module.exports = { addComment, deleteComment, getCommentsArticle };
