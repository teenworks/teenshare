/**
 *
 * topic_collect
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-04
 * @update 2014-09-04
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;

var TopicCollectionSchema = new Schema({
  user_id: { type: ObjectId },
  topic_id: { type: ObjectId },
  create_at: { type: Date, default: Date.now }
});

mongoose.model('TopicCollection', TopicCollectionSchema);