const Sequelize = require('sequelize');
const db = require('../_db');
const Score = require('./score-model.js');
const Question = require('./question-model.js');

const chalk = require('chalk');

module.exports = db.define('item', {
  name: {
    type: Sequelize.STRING(100),
    allowNull: false
  }
}, {
  instanceMethods: {
    //this method can create or update an existig score
    updateScore(questionId, score = 0.5){
      return Score.findOrCreate({where: {questionId, itemId: this.id}})
      .then(foundScore => {
        let oldScore = foundScore.score;
        let newScore = (oldScore + score) / 2;
        return foundScore.update({score: newScore});
      })
    },
  },
    hooks: {
      afterCreate: function(item){
        return Question.findAll()
        .then(questions =>{
          var creatingScores = questions.map(question =>{
            return question.updateScore(item.id)
          });
          return Promise.all(creatingScores)
        })
      }
    }
})

