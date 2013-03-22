//Module dependencies
//-------------------------------------------------------------------------
var Seq = require('sequelize');

//UserModel
//---------------
//Initializes the UserModel table.  has fields
//
//username: a unique identifier used by users
//firstName: the users first name
//lastName: the users last name
//liquidAssets: the amount of cash the user has in stokpile
//password: the users hashed and salted password
//email: the users email
//
//username is the primary key
//
//options
//--------
//freezeTableName stops sequalize from changing the table names to plurals
//
//TODO figure out how to do indexing and all that CS 144 stuff
//----------------------------------------------------------------------------
module.exports = {
	model:{
		username: Seq.STRING,
		firstName: Seq.STRING,
		lastName: Seq.STRING,
		liquidAssets: Seq.FLOAT,
		password: Seq.STRING,
		email: Seq.STRING
	},
	options:{
		freezeTableName: true
	}
}
