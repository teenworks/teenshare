/**
 *
 * user
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-03
 * @update 2014-09-06
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var Promise = mongoose.Promise;

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

UserSchema.method.add = function () {
  var self = this;
  var p = new Promise();

  self.save(function (err, data) {
    if (err) {
      p.reject(err);
    } else {
      p.resolve(null, data);
    }
  });

  return p;
};

mongoose.model('User', UserSchema);