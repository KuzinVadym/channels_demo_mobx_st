let router = require('express').Router();
let channels_data = require('./channels.json');

function eval_level(value) {
  let temp;
  switch (value) {
    case 'uhd':
      temp = 3;
      break;
    case 'hd':
      temp = 2;
      break;
    case 'sd':
      temp = 1;
      break;
    default:
      temp = 0;
  }
  return temp;
}

function comparator(a,b) {
  return eval_level(b.level) - eval_level(a.level);
}

router.get('/', function(req, res, next) {
  console.log("Get Channels");
  const prepared_chanels = channels_data.channels.map(item => {
    if (item.qualities.length == 1 && item.qualities[0].availability === 'available') {
      return item;
    } else {
      let available_qualities = item.qualities.filter(item => item.availability === 'available').sort(comparator).slice(0,1);
      if (available_qualities.length > 0) {
        item.qualities = available_qualities;
        return item;
      }
    }
  }).filter(item => item != undefined );
  res.json(prepared_chanels);
});

module.exports = router;
