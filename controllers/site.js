/**
 * site.js
 *
 * @description: TeenShare Index Controller
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-24
 * @update: 2014-08-30
 */

var config = require('../config').config;
var EventProxy = require('eventproxy');

var User = require('../proxy').User;
var Topic = require('../proxy').Topic;

exports.index = function (req, res, next) {

  var page = parseInt(req.query.page, 10) || 1;
  var limit = config.topic_limit;

  page = page > 0 ? page : 1;

  // Use EventProxy
  var proxy = EventProxy.create('topics', 'pages', function (topics, pages) {
    res.render('index', {
      topics: topics,
      pages: pages
    });
  });

  proxy.fail(next);

  // 取topics
  var options = {
    skip: (page - 1) * limit,
    limit: limit,
    sort: [
      ['last_reply_at', 'desc']
    ]
  };

  Topic.getTopicsByQuery({}, options, proxy.done('topics', function (topics) {
    return topics;
  }));

  Topic.getCountByQuery({}, proxy.done(function (all_topics_count) {

  }));
};