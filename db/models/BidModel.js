//Module dependencies
//-------------------------------------------------------------------------
var Seq = require('sequelize');

//BidsModel
//---------------
//Initializes the BidsModel table.  has fields
//
//username: the username of the person placing the Bid
//productid: the productId of the product being bid on
//bidTime: the time the bid was places
//maxAmount: The bidders max price, will be used by the bidding algorithm
//numShares: the number of shares the user is trying to buy
//success: -1 if no, 0 for ongoing, 1 for yes
//
//
//ProductId and Time are a primary key.  Users may only bid on one product at a time
//
//options
//--------
//freezeTableName stops sequalize from changing the table names to plurals
//
//TODO figure out how to set primary keys, table joins, and indexing in sequalize
//----------------------------------------------------------------------------
module.exports = {
	model:{
		username: Seq.STRING,
		productId: Seq.STRING,
		bidTime: Seq.DATE,
		maxAmount: Seq.FLOAT,
		numberShares: Seq.INTEGER,
		success: Seq.INTEGER
	},
	options:{
		freezeTableName: true
	}
}
