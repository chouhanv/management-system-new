module.exports = function() {
  var mongoose = require('mongoose'),
  //dbAddress = ['localhost:27017/managementsystem'];
  dbAddress = ['localhost:27017/reamm'];
  mongoose.connect(dbAddress);
}