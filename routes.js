/**
 * routes.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 2014-08-21
 * @update: 2014-08-26
 */

var site = require('./controllers/site'),
    sign = require('./controllers/sign'),
    user = require('./controllers/user'),
    topic = require('./controllers/topic');

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