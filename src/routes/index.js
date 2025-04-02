const express = require('express');
const { register, login } = require('../controllers/userController');
const { createArticle, getAllArticles, getArticle, updateArticle, deleteArticle } = require('../controllers/articleController');
const { addComment, deleteComment, getCommentsArticle } = require('../controllers/commentController');
const { authenticateToken } = require('../middlewares/authMiddleware');

const router = express.Router();

// Rotas de Usuário
router.post('/auth/register', register);
router.post('/auth/login', login);

// Rotas de Artigos
router.post('/articles', authenticateToken, createArticle);
router.get('/articles', getAllArticles);
router.get('/articles/:id', getArticle);
router.put('/articles/:id', authenticateToken, updateArticle);
router.delete('/articles/:id', authenticateToken, deleteArticle);

// Rotas de Comentários
router.get('/comments', authenticateToken, getCommentsArticle);
router.post('/comments', authenticateToken, addComment);
router.delete('/comments/:id', authenticateToken, deleteComment);

module.exports = router;
