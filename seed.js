const Sequelize = require('sequelize');
const Promise = Sequelize.promise;
const chalk = require('chalk');

const db = require('./models/db/_db.js');
const Item = db.model('item');
const Question = db.model('question');
const Score = db.model('score');

function seedQuestions(){
  const questions = [
    'Is it a mammal?',
    'Is it female?',
    'Can it fly?',
    'Is it smaller than a bear?'
  ];

  const creatingQuestions = questions.map(question =>{
    return Question.create(question);
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

  const creatingItems = items.map(question =>{
    return Item.create(question);
  })

  return Promise.all(creatingItems);
}

function seedScores(){
  return Question.findAll()
  .then(function(questions){
    let updates = [];
    questions.forEach(question => {
      updates.push(question.updateScore(1));
      updates.push(question.updateScore(2));
      updates.push(question.updateScore(3));
      updates.push(question.updateScore(4));
    })
    return Promise.all(updates);
  })
}

db.sync({force: true})
.then(()=>{
  console.log(chalk.blue('synced db'));
  return seedQuestions();
}).then(()=>{
  console.log(chalk.blue('seeded questions'))
  return seedItems();
}).then(()=>{
  console.log(chalk.blue('seeded items'))
  return seedScores();
}).then(()=>{
  console.log(chalk.green('Seed successful!'));
  process.exit(0);
}).catch(err => {
    console.error(err);
    process.exit(1);
});
