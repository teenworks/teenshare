/**
 *
 * topic
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-03
 * @update 2014-09-03
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
  title: { type: String },
  content: { type: String },
  author_id: { type: ObjectId },
  create_at : { type: Date, default: Date.now },
  last_reply_at: { type: Date, default: Date.now }
});

TopicSchema.index({
  create_at: -1
});

TopicSchema.index({
  author_id: 1
});

TopicSchema.index({
  last_reply_at: -1
});

mongoose.model('Topic', TopicSchema);