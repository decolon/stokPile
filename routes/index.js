//Module dependencies
//------------------------------------------------------------------------------
var AM = require('../modules/account-manager');
//partials
//------------
//This function renders the partials.  Is called extensively by angular behind
//the scene to render all the pieces of the page.  Be careful when playing
//around with partials, it can do unexpected things
//
//This implementation also takes care of someone trying to see user pages
//even if they are not logged in.  If there is no current session (i.e. not
//logged in) and they are requesting a partial that is not publicly accessible,
//then the request is redirected to the signup page
//----------------------------------------------------------------------------
exports.partials = function(req, res){
		var name = req.params.name;
		if(req.session.user == null){
			if(name != 'signin' && name != 'signup'){
				name = 'signup';
			}
		}
		res.render('partials/' + name);
};


//autoLogin
//------------
//This function attempts to log the user in when they first come to the site.
//It does this by checking the session and cookies params.
//
//If there is no session and no cookies, it will render index
//
//If there is a session but no cookies, it will redirect to user.  This is so 
//if a user enters '/' in the url bar, they will not be redirected to the
//signin/signup page
//
//TODO Implement the third option.  Is the third case really else, or is it
//else if(req.session.user == null && (req.cookies.username != undefined && req.cookies.password != undefined))
//
//
exports.autoLogin = function(req, res){
	if(req.session.user == null && (req.cookies.username == undefined || req.cookies.password == undefined)){
		res.render('index');
	}else if(req.session.user != null){
		res.redirect('/user');
	}else{
		AM.autoLogin(req.cookies.username, req.cookies.password, function(user){
			if(user != null){
				req.session.user = user;
				res.redirect('/'+user.username+'/user')
			}else{
				res.render('index');
			}
		});
	}
};

//manualLogin
//-------------------------------
//This function is called when a user is trying to log in with entered data
//instead of with cookies.  (ie through the signin page)
//
//AM.manualLogin does all the grunt work.  All this does is direct to specific
//pages and create cookies if the user specified remember-me to be true.  If there
//is a problem it sends an error, if everything is fine it redirects to user
//--------------------------------------------------------------------------------
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
			res.redirect('/user/'+user.username);
		}
	});
};

//loggedInUserHome
//-------------------
//This function checks to see if the user already is in a session (ie logged in)
//If they are not, they are redirected to the home page
//
//If they are then it renders loggedIn.  This lets the user navigate through the
//logged in pages by entering the pages into the url box, but does not allow non
//logged in people to access private pages through the url box
//--------------------------------------------------------------------------------
exports.loggedInUserHome = function(req, res){
	if(req.session.user == null){
		res.redirect('/');
	}else{
		res.render('loggedIn');
	}
};

//TODO, PUT THIS FUNCTIONALITY INTO THE SITE
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

//logout
//------------------
//This function takes care of logging out.  It clears all cookies and then
//destroys the session.  After the session is destroyed, it redirects to
//the public home page
//-----------------------------------------------------------------------------
exports.logout = function(req, res){
	res.clearCookie('username');
	res.clearCookie('password');
	req.session.destroy(function(e){
		res.redirect('/');
	});
}

//newAccount
//--------------------
//This function takes care of creating a new user account.  First it uses
//AM.addAccount to create the new account and then it uses AM.manualLogin
//to bring the new user to their hompage
//
//If something goes wrong with creating the account then this function throws
//and error.  
//------------------------------------------------------------------------------
exports.newAccount = function(req, res){
	AM.addNewAccount({
		username: req.body.username,
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		password: req.body.password,
		email: req.body.email
	}, function(e){
		if(e){
			res.send(e, 404);
		}else{
			console.log('About to log in')
			AM.manualLogin(req.body.username, req.body.password, function(e, user){
				console.log('Logging in')
				req.session.user = user;
				res.redirect('/user/' + req.body.username);
			});
		}
	});
}

