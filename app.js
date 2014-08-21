var path = require('path');

var express = require('express'),
    app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', function(req, res) {
    res.send('Teen Share');
}).listen(3000);

console.log('TeenShare listening on http://localhost:3000');