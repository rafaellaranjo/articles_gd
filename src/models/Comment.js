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
  article_id: {
    type: DataTypes.INTEGER,
    references: {
      model: Article,
      key: 'id',
    },
  },
}, {
  tableName: 'comments',
  timestamps: true,
  hooks: {
    beforeCreate: async (comment) => {
      if (comment.id) {
        const exists = await Comment.findOne({ where: { id: comment.id } });
        if (exists) {
          delete comment.dataValues.id;
        }
      }
    }
  }
});

module.exports = Comment;
