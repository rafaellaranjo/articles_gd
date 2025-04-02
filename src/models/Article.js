const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Article = sequelize.define('Article', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  author: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tags: {
    type: DataTypes.ARRAY(DataTypes.STRING),
    defaultValue: [],
  },
}, {
  tableName: 'articles',
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

module.exports = Article;
