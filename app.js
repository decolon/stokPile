
/**
 * Module dependencies.
 */

var express = require('express');
var  http = require('http');
var  path = require('path');
var app  = express();

//Need to do it this way so I only start using the database after it has all loaded
var routes;
var AM;
var afterDatabaseLoad = function(){
	AM = require('./modules/account-manager');
	routes = require('./routes');
}


//Sequelize
//TODO change from root and change password
require('./db/singleton.js').setup('./models','./db/models', 'stokpile', 'root', afterDatabaseLoad, 'rome8187');
// Configuration
app.configure(function() {
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.cookieParser());
  app.use(express.session({secret:'placeholder'}));
  app.use(express.methodOverride());
  app.use(express.static(path.join(__dirname, 'public')));
  app.use(function(req, res, next) {
    if(req.url.match(/^\/test\//) != null) {
      res.sendfile(path.join(__dirname, req.url));
    } else {
      next();
    }
  });
  app.use(app.router);
  app.use(function(req, res, next) {
    throw new Error(req.url + ' not found');
  });
  app.use(function(err, req, res, next) {
    console.log(err);
    res.send(err.message);
  });
});




app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes

app.get('/', routes.loggedInUserHome);

app.post('/login', routes.manualLogin);
app.post('/newAccount', routes.newAccount);

app.get('/user', routes.user);
app.get('/invest', routes.invest);
app.get('/sell', routes.sell);
app.get('/logout', routes.logout);

app.get('/partials/:name', routes.partials);

// redirect all others to the index (HTML5 history)
app.get('*', routes.loggedInUserHome);

// Start server

http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
