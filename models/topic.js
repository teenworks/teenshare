/**
 * topic.js
 *
 * @description: Topic Model
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-25
 * @update: 2014-08-26
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
  title: { type: String },
  link: { type: String },
  author_id: { type: ObjectId },
  reply_count: { type: Number },
  collect_count: { type: Number },
  create_at: { type: Date, default: Date.now },
  last_reply: { type: ObjectId },
  last_reply_at: { type: Date, default: Date.now }
});

TopicSchema.index({ create_at: -1 });
TopicSchema.index({ author_id: 1 });
TopicSchema.index({ last_reply_at: -1 });

mongoose.model('Topic', TopicSchema);