const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('question', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
})
