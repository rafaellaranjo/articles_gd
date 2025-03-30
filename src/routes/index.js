const express = require('express');
const { register, login } = require('../controllers/userController');
const { createArticle, getAllArticles } = require('../controllers/articleController');
const { addComment } = require('../controllers/commentController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas de Usuário
router.post('/register', register);
router.post('/login', login);

// Rotas de Artigos
router.post('/articles', authenticateToken, createArticle);
router.get('/articles', getAllArticles);
router.put('/articles/:id', authenticateToken, updateArticle);
router.delete('/articles/:id', authenticateToken, deleteArticle);

// Rotas de Comentários
router.post('/comments', authenticateToken, addComment);
router.delete('/comments/:id', authenticateToken, deleteComment);

module.exports = router;
