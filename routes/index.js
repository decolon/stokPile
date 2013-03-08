
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index');
};

exports.partials = function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
};

exports.login = function(req, res){
	res.redirect('/user');
};

exports.user = function(req, res){
	res.render('loggedIn');
};

exports.invest = function(req, res){
	res.render('loggedIn');
};

exports.sell = function(req, res){
	res.render('loggedIn');
};


