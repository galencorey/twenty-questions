const Sequelize = require('sequelize');
const db = require('../_db');
const Score = require('./score-model.js');

module.exports = db.define('item', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
}, {
  instanceMethods: {
    //this method can create or update an existig score
    updateScore(question_id, score = 0.5){
      return Score.findOrCreate({where: {question_id, item_id = this.id}})
      .then(foundScore => {
        let oldScore = foundScore.score;
        let newScore = (oldScore + score) / 2;
        return foundScore.update({score: newScore});
      })
    }
  }
})
