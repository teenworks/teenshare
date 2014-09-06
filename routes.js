/**
 *
 * routes
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-05
 * @update 2014-09-06
 */

var Route = require('koa-router');

module.exports = function (app) {

  var route = new Route();

  var siteController = require('./controller/site');
  var signController = require('./controller/sign');

  // homepage
  route.get('/', siteController.index);

  // sign in and sign up.
  route.get('/signin', signController.signin);
  route.get('/signup', signController.signup);
  route.post('/doSignin', signController.doSignin);
  route.post('/doSignup', signController.doSignup);

  return route.middleware();
};

