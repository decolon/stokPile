//Module dependencies
//-------------------------------------------------------------------------
var Seq = require('sequelize');

//InvestmentsModel
//---------------
//Initializes the InvestmentsModel table.  has fields
//
//username: the username of the person with the investments
//productid: the productId of the product invested in
//investmentTime: the time at which the investment was made
//numberShares: The number of shares that the user ownes
//
//
//ProductId and username  are a primary key. A user only has one record per product
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
		investmentTime: Seq.DATE,
		numberShares: Seq.INTEGER
	},
	options:{
		freezeTableName: true
	}
}

