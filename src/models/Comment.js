const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Article = require('./Article');

const Comment = sequelize.define('Comment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  articleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Article,
      key: 'id',
    },
  },
}, {
  tableName: 'comments',
  timestamps: true,
});

module.exports = Comment;
