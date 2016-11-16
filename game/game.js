const _ = require('lodash');
const Item = require('../db/models/item-model');

function Game(){
  Item.findAll()
  .then(items =>{
    this.possibilities = items;
  })
  this.responses = [];
  this.solution = '';
}

Game.prototype.printPossibilities = function(){
  console.log(this.possibilities);
}

var test = new Game();
setTimeout(test.printPossibilities, 2000);
