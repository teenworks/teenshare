/**
 * routes.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 21/8/14
 * @update: 21/8/14
 */

var site = require('./controllers/site');
var sign = require('./controllers/sign');
var user = require('./controllers/user');
var topic = require('./controllers/topic');

module.exports = function(app) {
  // 首页
  app.get('/', site.index);
  // 登录
  app.get('/signin', sign.showLogin);
  app.post('/login', sign.login);
  // 注册
  app.get('/signup', sign.showSignup);
  app.post('/signup', sign.signup);
  // 发布链接
  app.post('/topic/create');
};