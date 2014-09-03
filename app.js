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

var koa = require('koa');
var app = koa();

app.use(function *() {
  this.body = 'hello koa';
});

app.on('error', function (err) {
  console.error('Server error: ', err);
});

app.listen(config.port);
console.log('Server listening on: ', config.port);
