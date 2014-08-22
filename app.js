var path = require('path');

var express = require('express'),
    app = express();

require('./models');

var routes = require('./routes');
var config = require('./config').config;
var staticDir = path.join(__dirname, 'public');

// set view engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use('/public', express.static(staticDir));

routes(app);

app.listen(config.port, function() {
  console.log('TeenShare listening on http://localhost:' + config.port);
});

module.exports = app;