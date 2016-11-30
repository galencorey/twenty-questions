const inquirer = require('inquirer');
const Response = require('../game/response.js');
const Game = require('../game/game.js');
const game = new Game();

const MAX_QUESTIONS = 2;
const CHOICES = [{name: 'yes', value: 1},
 {name: 'probably', value: 0.75},
 {name: 'not sure', value: 0.5},
 {name: 'probably not', value: 0.25},
 {name: 'no', value: 0}];

game.initialize()
.then(()=>{
  let questionCount = 0;
  ask(0);
});

function ask(questionCount){
  console.log(questionCount);
  if (questionCount > MAX_QUESTIONS){
    console.log(game.possibilities);
  } else {
    let [question] = game.getQuestion();
    inquirer.prompt({name:'score', type: 'list', message: question.body, choices: CHOICES})
    .then((answer)=>{
      questionCount ++;
      game.processResponse({
        questionId: question.id,
        score: answer.score
      });
      ask(questionCount + 1)
    })
    .catch((error)=>{
      console.log(error);
    });
  }

  console.log('Great job.');
}
/*
let me show you what it does.

game.initialize is async setup then ask is called
it asks the first question
and then it is supposed to ask another one, but it quits


*/
