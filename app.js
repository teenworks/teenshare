/**
 *
 * TeenShare
 *
 * A sharing platform for TeenWorks
 *
 * Copyright (c) 2014 TeenWorks contributors
 */

var config = require('./config');

/**
 * Module Dependencies
 */

var path = require('path');

var koa = require('koa');
var app = koa();

app.use(require('koa-bodyparser')());
app.use(require('koa-less')(__dirname + '/public'));
app.use(require('koa-static')(__dirname + '/public'));


require('./model');

app.use(require('./routes')(app));

require('koa-ejs')(app, {
  root: path.join(__dirname, 'view'),
  layout: 'layouts/main',
  viewExt: 'ejs',
  cached: false,
  debug: true
});

app.on('error', function (err) {
  console.error('Server error: ', err);
});

app.listen(config.port);

console.log('Server listening on: ', config.port);

module.exports = app;