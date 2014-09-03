/**
 *
 * index
 *
 * @description
 * @author shaochunhua
 * @create 2014-09-03
 * @update 2014-09-03
 */

var mongoose = require('mongoose');
var config = require('../config');

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error.', config.db, err.message);
    process.exit(1);
  }
});
