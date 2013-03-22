//Module dependencies
//-------------------------------------------------------------------------
var Seq = require('sequelize');

//OffersModel
//---------------
//Initializes the OffersModel table.  has fields
//
//username: the username of the person placing the offer
//productid: the productId of the product being offered
//offerTime: the time the offer was places
//minAmount: the min price the seller will accept
//success: -1 if no, 0 for ongoing, 1 for yes
//
//
//ProductId and Time are a primary key.  Offers for a specific product can not
//overlap in time
//
//options
//--------
//freezeTableName stops sequalize from changing the table names to plurals
//
//TODO figure out how to set primary keys, table joins, and indexing in sequalizek
//----------------------------------------------------------------------------
module.exports = {
	model:{
		username: Seq.STRING,
		productId: Seq.STRING,
		offerTime: Seq.DATE,
		minAmmount: Seq.FLOAT,
		numberShares: Seq.INTEGER,
		success: Seq.INTEGER
	},
	options:{
		freezeTableName: true
	}
}

