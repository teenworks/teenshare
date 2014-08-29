/**
 *
 * reply
 *
 * @description TeenWorks Reply Model
 * @author shaochunhua
 * @create 2014-08-29
 * @update 2014-08-29
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectID;

var ReplySchema = new Schema({
    content: { type: String },
    topic_id: { type: ObjectId },
    author_id: { type: ObjectId },
    reply_id: { type: ObjectId },
    create_at: { type: Date, default: Date.now }
});

ReplySchema.index({topic_id: 1});
ReplySchema.index({author_id: 1, create_at: -1});

mongoose.model('Reply', ReplySchema);