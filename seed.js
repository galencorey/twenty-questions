const Sequelize = require('sequelize');
const Promise = require('bluebird');
const chalk = require('chalk');

const db = require('./db/_db.js');
const Item = require('./db/models/item-model.js');
const Question = require('./db/models/question-model.js');
const Score = require('./db/models/score-model.js');

function seedQuestions(){
  const questions = [
    'Is it a mammal?',
    'Is it female?',
    'Can it fly?',
    'Is it smaller than a bear?'
  ];

  const creatingQuestions = questions.map(question =>{
    return Question.create({body: question});
  })

  return Promise.all(creatingQuestions);
}

function seedItems(){
  const items = [
    'Bojack Horseman',
    'Donald Duck',
    'Hedwig',
    'Nemo'
  ];

  const creatingItems = items.map(item =>{
    return Item.create({name: item});
  })

  return Promise.all(creatingItems);
}

db.sync({force: true})
.then(()=>{
  console.log(chalk.blue('synced db'));
  return seedQuestions();
})
.then(()=>{
  return seedItems();
})
.then(()=>{
  console.log(chalk.green('Seed successful!'));
  process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
