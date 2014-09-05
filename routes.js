/**
 *
 * routes
 *
 * @description
 * @author Fantasy <fantasyshao@icloud.com>
 * @create 2014-09-05
 * @update 2014-09-05
 */

var Route = require('koa-router');

module.exports = function (app) {

  var route = new Route();

  var siteController = require('./controller/site');

  route.get('/', siteController.index);

  return route.middleware();
};

