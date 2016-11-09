const Sequelize = require('sequelize');
const db = require('../_db');

module.exports = db.define('item', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
})
