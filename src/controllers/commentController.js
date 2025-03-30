const Comment = require('../models/Comment');

// Adicionar um novo comentário
async function addComment(req, res) {
  try {
    const { content, author, articleId } = req.body;
    const comment = await Comment.create({ content, author, articleId });
    res.status(201).json(comment);
  } catch (err) {
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

module.exports = { addComment };
