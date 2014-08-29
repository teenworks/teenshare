/**
 *
 * reply
 *
 * @description TeenShare Reply Proxy
 * @author shaochunhua
 * @create 2014-08-29
 * @update 2014-08-29
 */

var models = require('../models');
var Reply = models.Reply;

var User = require('./user');

/**
 * 根据id获取回复
 *
 * @param id
 * @param callback
 */
exports.getReplyById = function (id, callback) {
  Reply.findOne({_id: id}, callback);
};