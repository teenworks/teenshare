/**
 * user.js
 *
 * @description: Operations on users
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 21/8/14
 * @update: 21/8/14
 */

var models = require('../models');
var User = models.User;

/**
 * 新建用户
 *
 * @param name
 * @param nickname
 * @param pass
 * @param callback
 */
exports.newAndSave = function (name, nickname, pass, callback) {
  var user = new User();

  user.name = name;
  user.nickname = nickname;
  user.pass = pass;

  user.save(callback);
};

/**
 * 查询用户列表
 *
 * @param query
 * @param opt
 * @param callback
 */
exports.getUsersByQuery = function (query, opt, callback) {
  User.find(query, [], opt, callback);
};

/**
 * 根据id查询用户
 *
 * @param id
 * @param callback
 */
exports.getUserById = function (id, callback) {
  User.findOne({_id: id}, callback);
};

/**
 * 根据用户名获取用户
 *
 * @param name
 * @param callback
 */
exports.getUserByQuery = function (name, callback) {
  User.find({name: name}, callback);
};

/**
 * 根据用户名获取用户
 *
 * @param nickname
 * @param callback
 */
exports.getUserByLoginName = function (nickname, callback) {
  User.findOne({'nickname': nickname}, callback);
};