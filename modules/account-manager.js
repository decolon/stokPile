//CODE ADAPTED FROM
//https://github.com/braitsch/node-login
//------------------------------------------------------------------------------

//Module Dependencies
//------------------------------------------------------------------------------
var crypto = require('crypto');
var moment = require('moment');
var orm = require('../db/singleton.js');


//Gets UserModel table from the orm and stores it in Users
//Will use this extensively for checking log in attempts and 
//creating new accounts
//-------------------------------------------------------------------------------
var Users = orm.model('UserModel');


//autoLogin
//------------------
//This function takes the data from the cookie and checks the Database to
//make sure there is a user with that password to log in.  If there is, the 
//user is returned otherwise null is returned.  
//--------------------------------------------------------------------------------
exports.autoLogin = function(username, password, callback){
	Users.find({where:{username:username}}).success(function(user){
		if(user){
			user.password == password ? callback(user) : callback(null);
		}else{
			callback(null);
		}
	});
}

//manualLogin
//--------------
//This function is used to make sure the supplied username and password are valid.
//First it attempts to get a user with the username.  If it fails it throws an error.
//Then it checks to see if the supplied password, when hashed, is the same as that 
//users password.  If not, an error is sent to the callback.  If both tests are passed,
//the user is sent back with no error
//
//TODO have more helpful error messages
//----------------------------------------------------------------------------------
exports.manualLogin = function(username, password, callback){
	Users.find({where:{username:username}}).success(function(user){
		if(user != undefined){
			validatePassword(password, user.password, function(err, res){
				if(res){
					callback(null, user);
				}else{
					callback('invalid-username-or-password');
				}
			});
		}else{
			callback('user-not-found');
		}
	});
}

//addNewAccount
//-------------------------
//This function creates a new user.  First it checks to make sure the given username
//and email are not being used by another user.  This function will throw an error
//if either one is not unique.  
//
//After getting through the tests, addNewAccount hashes the supplied password,
//replaces the text password with the hashed password, and then uses User,create
//to create the new user
//
//the callback is used for error messages and logging in the user.  See
//./routes/index.js -> newAccount for more information
//---------------------------------------------------------------------------------
exports.addNewAccount = function(newData, callback){
	Users.find({where:{username:newData.username}}).success(function(user){
		if(user != undefined){
			callback('username-taken');
		}else{
			Users.find({where:{email:newData.email}}).success(function(newUser){
				if(newUser != undefined){
					callback('email-taken');
				}else{
					Users.create(newData);
					callback(null);
//					saltAndHash(newData.password, function(hash){
//						newData.password = hash;
//						Users.create(newData);
//						callback(null);
//					});
				}
			});
		}
	});
}

//updateAccount
//----------------------
//TODO: Build this functionality into the site
//--------------------------------------------------------------------------------
exports.updateAccount = function(newData, callback){
	Users.find({where:{username:newData.username}}).success(function(user){
		user.username = newData.username;
		user.email = newData.email;
		if(newData.password == ''){
			user.save();			
		}else{
			saltAndHash(newData.password, function(hash){
				user.password = hash;
				user.save();
			});
		}
	});
}


//updatePassword
//---------------------
//TODO: Build this functionality into the site
//--------------------------------------------------------------------------------
exports.updatePassword = function(email, newPass, callback){
	Users.find({where:{email:email}}).success(function(user){
		saltAndHash(newPass, function(hash){
			user.password = hash;
			user.save();
		}).error(function(error){
			callback(null);
		});
	});
}

//deleteAccount
//------------------------
//TODO: Build this functionality into the site
//-------------------------------------------------------------------------------
exports.deleteAccount = function(id, callback){
	Users.find({where:{id:id}}).success(function(user){
		user.destroy().error(function(error){
			console.log('USER NOT DELETED')
		});
	});
}

//HELPER METHODS
//--------------------------------------------------------------------------------

//generateSalt
//--------------------
//Generates a salt
//
//TODO make sure this is valid, secure code
//--------------------------------------------------------------------------------
var generateSalt = function(){
	var set = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	var salt = '';
	for(var i=0; i<10; i++){
		var p = Math.floor(Math.random()*set.length);
		salt += set[p];
	}
	return salt;
}

//md5
//------
//Hashing Algorithm
//
//TODO change to a more secure one, sha1? 
//---------------------------------------------------------------------------------
var md5 = function(str){
	return crypto.createHash('md5').update(str).digest('hex');
}

//saltAndHash
//----------------
//gets a salt and appends it to the hashed password + salt.  This hole beautiful 
//mess is then returned in the callback
//--------------------------------------------------------------------------------
var saltAndHash = function(password, callback){
	var salt = generateSalt();
	callback(salt+md5(password + salt));
}

//validatePassword
//-----------------
//This function takes a plain password and a hashed password and checks
//to see if they are the same.  First it gets the salt from the hashed
//password.  Then it hashes the plain password and returns via the 
//callback weather or not the passwords are the same
//------------------------------------------------------------------------------
var validatePassword = function(plainPassword, hashedPassword, callback){
	var salt = hashedPassword.substr(0, 10);
	var validHash = salt + md5(plainPassword + salt);
	//TODO change this back when in real mode
	callback(null, plainPassword === hashedPassword);
}




