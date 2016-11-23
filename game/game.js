const Item = require('../db/models/item-model');
const Score = require('../db/models/score-model');
const Question = require('../db/models/question-model');

const ItemList = require('./item-list');

function Game(){
  this.possibilities = [];
  this.questions = [];
  this.responses = [];
  this.solution = '';
}

Game.prototype.printPossibilities = function(){
  console.log('POSS', this.possibilities);
}


Game.prototype.initialize = function(){
  const self = this;
  const dbPromises = [Item.findAll(), Score.findAll(), Question.findAll()];

  return Promise.all(dbPromises)
  .then(([items, scores, questions]) =>{
    self.questions = questions;
    self.possibilities = new ItemList(items, scores);
  })
}


var test = new Game();

test.initialize()
.then(()=>{
  test.printPossibilities();
})
.catch((err)=>{
  console.error(err);
})
