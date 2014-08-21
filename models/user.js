/**
 * user.js
 *
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-21
 * @update: 2014-08-21
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  pass: { type: String }
});

UserSchema.index({
  name: 1,
  unique: true
});

mongoose.model('User', UserSchema);