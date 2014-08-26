/**
 * index.js
 *
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-21
 * @update: 2014-08-21
 */

var mongoose = require('mongoose');
var config = require('../config').config;

mongoose.connect(config.db, function (err) {
  if (err) {
    console.error('connect to %s error.', config.db, err.message);
    process.exit(1);
  }
});

require('./user');
require('./topic');

exports.User = mongoose.model('User');
exports.Topic = mongoose.model('Topic');