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
  nickname: { type: String },
  pass: { type: String },
  topic_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 }
});

UserSchema.index({
  name: 1,
  unique: true
});

mongoose.model('User', UserSchema);