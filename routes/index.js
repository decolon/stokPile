var AM = require('../modules/account-manager');

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

exports.logout = function(req, res){
	res.redirect('index');
};


//Will attempt to auto login when directed to the home page
exports.autoLogin = function(req, res){
	if(req.cookies.username == undefined || req.cookies.password == undefined){
		res.render('index');
	}else{
		AM.autoLogin(req.cookies.username, req.cookies.password, function(user){
			if(user != null){
				req.session.user = user;
				res.redirect('/user')
			}else{
				res.render('index');
			}
		});
	}
};

//Will manual login when posting data from sign in sheet
exports.manualLogin = function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	AM.manualLogin(username, password, function(e, user){
		if(!user){
			//TODO, change this to be nicer, and to work
			res.send(e, 404);
		}else{
			req.session.user = user;
			if(req.param('remember-me') == 'true'){
				res.cookie('user', user.username, {maxAge: 900000});
				res.cookie('password', user.password, {maxAge: 900000});
			}
			//TODO find out what res.send does
			res.send(user, 200);
		}
	});
};

//logged in user homepage
exports.loggedInUserHome = function(req, res){
	if(req.session.user == null){
		res.render('index');
	}else{
		res.render('/user');
	}
};

//Update User information and log out
//TODO, implement this
exports.updateUser = function(req, res){
	if(req.param('username') != undefined){
		AM.updateAccount({
			username: req.param('username'),
			password: req.param('password'),
			email: req.param('email')
		}, function(e, user){
			if(e){
				res.send('error-updating-account', 404);
			}else{
				req.session.user = user;
				if(req.cookies.username != undefined && req.cookies.password != undefined){
					res.cookie('username', user.username, {maxAge: 900000});
					res.cookie('password', user.password, {maxAge: 900000});
				}
				res.send('ok', 200);
			}
		});
	}else if(req.param('logout') == 'true'){
		res.clearCookie('username');
		res.clearCookie('password');
		req.session.destroy(function(e){
			res.send('ok', 200);
		});
	}
}

//Creates a new account
exports.signUp = function(req, res){
	res.render('index');
}

exports.newAccount = function(req, res){
	AM.addNewAccount({
		username: req.body.username,
		password: req.body.password,
		email: req.body.email
	}, function(e){
		if(e){
			res.send(e, 404);
		}else{
			res.send('ok', 200);
		}
	});
}



