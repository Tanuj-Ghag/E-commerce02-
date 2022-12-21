const fi = require('frequent-itemset');

console.log(fi([['4', '5', '3'], ['1', '2', '3'], ['4', '6', '3'], ['4', '5', '3', '1', '2']],
  0.5,
  true
));
