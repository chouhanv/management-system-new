module.exports = function() {
  var mongoose = require('mongoose'),
  dbAddress = ['104.207.132.73:27017/managementsystem'];
  mongoose.connect(dbAddress);
}