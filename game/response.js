//A response object links a questionId to a score in a particular game
//(for a particular item that the user has chosen)
//it is generated based on user input
function Response(questionId, score){
  this.questionId = questionId;
  this.score = score;
}
