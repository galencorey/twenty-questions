const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('score', {
  questionId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  itemId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.FLOAT,
    defaultValue: 0.5
  }
})

