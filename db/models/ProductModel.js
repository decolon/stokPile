//Module dependencies
//-------------------------------------------------------------------------
var Seq = require('sequelize');

//ProductModel
//---------------
//Initializes the ProductModel table.  has fields
//
//productid: the unique identifier of the product
//lastSellPrice: the last sell price of a share
//numberShares: the total number of shares the product has
//ipoTime: the time the product was placed on stokpile
//description: an in-depth description of the product
//name: the products human readable name
//picture: url of the products picture
//discovererId: the user id of the person who put the product on stokpile
//
//
//ProductId is the primary key.  
//
//options
//--------
//freezeTableName stops sequalize from changing the table names to plurals
//
//TODO figure out how to do indexing and all that CS 144 stuff
//----------------------------------------------------------------------------
module.exports = {
	model:{
		name: Seq.STRING,
		discovererId: Seq.STRING,
		description: Seq.TEXT,
		lastSellPrice: Seq.FLOAT,
		numberShares: Seq.INTEGER,
		ipoTime: Seq.DATE,
		picture: Seq.STRING
	},
	options:{
		freezeTableName: true
	}
}

