const Sequelize = require('sequelize');
const db = require('../_db');
const Score = require('./score-model.js');

module.exports = db.define('question', {
  body: {
    type: Sequelize.TEXT,
    allowNull: false
  }
},
{
  instanceMethods: {
    //this method can create or update an existig score
    updateScore(item_id, score = 0.5){
      return Score.findOrCreate({where: {item_id, question_id: this.id}})
      .then(foundScore => {
        let oldScore = foundScore.score;
        let newScore = (oldScore + score) / 2;
        return foundScore.update({score: newScore});
      })
    }
  }
})
