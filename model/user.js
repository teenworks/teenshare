/**
 *
 * user
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-03
 * @update 2014-09-03
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: { type: String },
  password: { type: String },
  topic_count: { type: Number, default: 0 },
  collect_count: { type: Number, default: 0 }
});

UserSchema.index({
  name: 1,
  unique: true
});

mongoose.model('User', UserSchema);