/**
 * config.js
 *
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-21
 * @update: 2014-08-26
 */

var path = require('path');
var pkg = require('./package.json');

var config = {
  name: pkg.name,
  description: pkg.description,
  version: pkg.version,
  db: 'mongodb://127.0.0.1/teenshare',
  db_name: 'teenshare',
  session_secret: 'teenshare',
  auth_cookie_name: 'teenshare',
  port: 3000,
  topic_limit: 30
};

module.exports = config;
module.exports.config = config;

