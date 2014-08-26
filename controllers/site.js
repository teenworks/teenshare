/**
 * site.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 24/8/14
 * @update: 24/8/14
 */

var config = require('../config').config;

exports.index = function (req, res, next) {
  res.render('index');
};