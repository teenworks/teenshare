/**
 *
 * TeenShare
 *
 * A sharing platform for TeenWorks
 *
 * Copyright (c) 2014 TeenWorks contributors
 */

var koa = require('koa');
var app = koa();

app.use(function *() {
  this.body = 'hello koa';
});

app.listen(3000);