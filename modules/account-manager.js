var crypto = require('crypto');
var moment = require('moment');
var orm = require('../db/singleton.js');

//get User table
var Users = orm.model('UserModel');


//attempts to auto login a user by looking for cookies
//
//TODO: why dont i need to validate the password
exports.autoLogin = function(username, password, callback){
	Users.find({where:{username:username}}).success(function(user){
		if(user){
			user.password == password ? callback(user) : callback(null);
		}else{
			callback(null);
		}
	});
}

//why is this different than auto
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

//adds a new account
exports.addNewAccount = function(newData, callback){
	Users.find({where:{username:newData.username}}).success(function(user){
		if(user != undefined){
			callback('username-taken');
		}else{
			Users.find({where:{email:newData.email}}).success(function(newUser){
				if(newUser != undefined){
					callback('email-taken');
				}else{
					saltAndHash(newData.password, function(hash){
						newData.password = hash;
						newData.date = moment().format('MMMM Do YYYY, h:mm:ss a');
						//TODO something needs to happen when i create
						//a new user, but not sure what yet
						console.log(newData)
						Users.create(newData);
						callback(null);
					});
				}
			});
		}
	});
}

//this will update an account
//TODO: make an account update page to this is actually used
exports.updateAcount = function(newData, callback){
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

//this will change your password, i assume used when someone looses their
//password
//TODO: actually use this
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

//will delete an account
//TODO: better error checking
exports.deleteAccount = function(id, callback){
	Users.find({where:{id:id}}).success(function(user){
		user.destroy().error(function(error){
			console.log('USER NOT DELETED')
		});
	});
}

//TODO write more setter and getter things for account information
//

//Helper methods to create a password
//TODO make sure is secure
//TODO use sha1 not md5
//TODO make supper succure

var generateSalt = function(){
	var set = '1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
	var salt = '';
	for(var i=0; i<10; i++){
		var p = Math.floor(Math.random()*set.length);
		salt += set[p];
	}
	return salt;
}

var md5 = function(str){
	return crypto.createHash('md5').update(str).digest('hex');
}

var saltAndHash = function(password, callback){
	var salt = generateSalt();
	callback(salt+md5(password + salt));
}

var validatePassword = function(plainPassword, hashedPassword, callback){
	var salt = hashedPassword.substr(0, 10);
	var validHash = salt + md5(plainPassword + salt);
	callback(null, hashedPassword === validHash);
}




