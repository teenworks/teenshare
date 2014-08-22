/**
 * routes.js
 *
 * @description:
 * @author: fantasy <fantasyshao@icloud.com>
 * @create: 21/8/14
 * @update: 21/8/14
 */

var sign = require('./controllers/sign');
var user = require('./controllers/user');

module.exports = function(app) {
  // 登录
  app.get('/signin', sign.showLogin);
  // 注册
  app.get('/signup', sign.showSignup);
  app.post('/signup', sign.signup);
};