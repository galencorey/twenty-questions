//generates a list of items joined with corresponding scores
function PossibilityList(items, scores){
  this.list = items.map(item => {
    item.scores = [];
    scores.forEach(function(score){
      if (score.itemId === item.id){
        item.scores.push();
      }
    })
    return item;
  })
}

module.exports = PossibilityList;
