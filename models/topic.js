/**
 * topic.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 25/8/14
 * @update: 25/8/14
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicSchema = new Schema({
  title: { type: String },
  link: { type: String },
  author_id: { type: ObjectId },
  reply_count: { type: Number },
  collect_count: { type: Number }
});

TopicSchema.index({ author_id: 1 });

mongoose.model('Topic', TopicSchema);