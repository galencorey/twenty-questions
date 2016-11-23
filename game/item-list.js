//generates a list of items joined with corresponding scores
function ItemList(items, scores){
  this.list = items.map(item => {
    item.scores = [];
    scores.forEach(function(score){
      if (score.item_id === item.id){
        item.scores.push(score);
      }
    })
    return item;
  })
}

module.exports = ItemList;
