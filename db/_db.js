const Sequelize = require('sequelize');
const db = new sequelize('postgres://localhost:5432/twentyq');

module.exports = db;
