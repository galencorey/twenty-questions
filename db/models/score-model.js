const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('score', {
  question_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  item_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  score: {
    type: Sequelize.FlOAT,
    defaultValue: 0.5
  }
})

