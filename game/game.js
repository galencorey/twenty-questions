const Item = require('../db/models/item-model');
const Score = require('../db/models/score-model');
const Question = require('../db/models/question-model');

const PossibilityList = require('./possibilities');

function Game(){
  this.possibilities = [];
  this.questions = [];
  this.responses = [];
  this.solution = '';
  this.questionCount = 0;
}

Game.prototype.initialize = function(){
  //Creates a new game by obtaining all possible items, questions, and their
  //corresponding scores from the database
  const self = this;
  const dbPromises = [Item.findAll(), Score.findAll(), Question.findAll()];

  return Promise.all(dbPromises)
  .then(([items, scores, questions]) =>{
    self.questions = questions;
    self.possibilities = new PossibilityList(items, scores);
  })
}

Game.prototype.processResponse = function(response){
  //Processes a response by pushing the response to the game object's response
  //array for storage, and adjusts the possibilities array
  this.responses.push(response);

  let revisedPossibilities = this.possibilities.filter((poss) => {
    let score = poss.scores.find((score)=>{
      return score.questionId === response.questionId;
    });
    return score.score > 0.25;
  });

  revisedPossibilities.sort(function(poss1, poss2){
    return poss1.score.score > poss2.score.score;
  })
}

Game.prototype.getQuestion = function(){
  //returns a random question and removes it from the questions array
  const randIdx = Math.floor(Math.random()*this.questions.length);

  return this.questions.splice(randIdx, 1);
}
/***** testing down here ******/

Game.prototype.printPossibilities = function(){
  //for testing purposes, logs all possibilities of a game
  console.log('POSS', this.possibilities);
}


var test = new Game();

test.initialize()
.then(()=>{
  test.printPossibilities();
})
.catch((err)=>{
  console.error(err);
})
