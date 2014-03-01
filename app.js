var express = require('express');
var ejsLocals = require('ejs-locals');

var path = require('path');
var http = require('http');

var app = express();

app.set('env', process.env.NODE_ENV || 'local');
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.engine('ejs', ejsLocals);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.cookieParser());
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.static(path.join(__dirname, 'static')));

/* Ensure SSL Enabled on heroku */
app.all('*', function (req, res, next) {
  if (!process.env.FORCE_SSL) {
    /* do not force */
    return next();
  }

  if (req.get('x-forwarded-proto') != "https") {
    res.set('x-forwarded-proto', 'https');
    return res.redirect('https://' + req.get('host') + req.url);
  }

  return next();
});

app.all('/', function(req, res) {
  res.render('index.ejs', {
    connectUrl: process.env.GOINSTANT_CONNECT_URL
  });
});

app.all('/dev', function(req, res) {
  res.render('dev.ejs', {
    connectUrl: process.env.GOINSTANT_CONNECT_URL
  });
});

var port = app.get('port');
console.log('Listening on ' + port);
app.listen(port);
