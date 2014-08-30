/**
 * topic.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-25
 * @update: 2014-08-30
 */

var EventProxy = require('eventproxy');

var models = require('../models');
var Topic = models.Topic;

var User = require('./user');
var Reply = require('./reply');

/**
 * 根据id获取Topic
 *
 * @param id
 * @param callback
 */
exports.getTopicById = function (id, callback) {

  var proxy = new EventProxy();
  var events = ['topic', 'author'];

  proxy.assign(events, function (topic, author) {
    return callback(null, topic, author);
  }).fail(callback);

  Topic.findOne({_id: id}, proxy.done(function (topic) {
    if (!topic) {
      proxy.emit('topic', null);
      proxy.emit('author', null);

      return;
    }

    proxy.emit('topic', topic);

    User.getUserById(topic.author_id, proxy.done('author'));
  }));

};

/**
 * 根据查询获取Topic
 *
 * @param query
 * @param opt
 * @param callback
 */
exports.getTopicsByQuery = function (query, opt, callback) {

  Topic.find(query, ['_id'], opt, function (err, docs) {
    if (err) return callback(err);

    if (docs.length === 0) return callback(null, []);

    var topics_id = [];

    for (var i = 0; i < docs.length; i++) {
      topics_id.push(docs[i]._id);
    }

    var proxy = new EventProxy();

    proxy.after('topic_ready', topics_id.length, function (topics) {

      var filtered = topics.filter(function (item) {
        return !!item;
      });

      return callback(null, filtered);
    });

    proxy.fail(callback);

    topics_id.forEach(function (id, item) {
      exports.getTopicById(id, proxy.group('topic_ready', function (topic, author, last_reply) {

        if (topic) {
          topic.author = author;
          topic.reply = last_reply;
        }

        return topic;

      }));
    });

  });

};

/**
 * 获取Topic的总数
 *
 * @param query
 * @param callback
 */
exports.getCountByQuery = function (query, callback) {
  Topic.count(query, callback);
};
