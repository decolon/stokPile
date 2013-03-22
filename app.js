
//Module dependencies
//----------------------------------------------------------------------------
var express = require('express');
var  http = require('http');
var  path = require('path');
var app  = express();

//Need to load these modules in a callback because they can only load
//after the database has finished.  The callback is called by the 
//database when it is finished setting up
//------------------------------------------------------------------------------
var routes;
var AM;
var afterDatabaseLoad = function(){
	AM = require('./modules/account-manager');
	routes = require('./routes/index');
	api = require('./routes/api');
}

//Sequelize
//TODO change from root and change password
//-----------------------------------------------------------------------
require('./db/singleton.js').setup('./models','./db/models', 'stokpile', 'root', afterDatabaseLoad, '', {
	host: process.env.DATABASE_URL,
	protocol: null,
	dialect: 'postgres'
});

// Configuration
// Much of this I got from sample applications.  I don't understand everything
// TODO understand this code
// -----------------------------------------------------------------------
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

//Development/Production specific configurations
//again, not really sure why we need this
//TODO understand this code
//--------------------------------------------------------------------------
app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
  app.use(express.errorHandler());
});

// Routes
// ---------------------------------------------------------------------------
app.get('/', routes.autoLogin);

app.post('/login', routes.manualLogin);
app.post('/newAccount', routes.newAccount);

app.get('/logout', routes.logout);
app.get('/user/:id', routes.loggedInUserHome);
app.get('/invest/:id', routes.loggedInUserHome);
app.get('/sell/:id', routes.loggedInUserHome);

app.get('/user/:id/investments', api.investments);
app.get('/user/:id/investments/:name', api.findInvestment);
app.get('/user/:id/summary', api.summary);
app.get('/invest/api/products/all', api.products);
app.get('/invest/:id/currentBids', api.currentBids);
app.get('/sell/:id/pastOffers', api.pastOffers);
app.get('/invest/:name/products', api.findProduct);
app.post('/product/new', api.newProduct);
app.post('/bid/new', api.newBid);
app.post('/offer/new', api.newOffer);


app.get('/partials/:name', routes.partials);
app.get('*', routes.loggedInUserHome);

// Start server
//----------------------------------------------------------------------------
http.createServer(app).listen(app.get('port'), function() {
  console.log("Express server listening on port " + app.get('port'));
});
