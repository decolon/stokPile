//Required Modules
//-----------------------------
var orm = require('../db/singleton');

//Database Tables
//---------------------------------------------------
var UserModel = orm.model('UserModel');
var InvestmentModel = orm.model('InvestmentModel');
var ProductModel = orm.model('ProductModel');
var BidModel = orm.model('BidModel');
var OfferModel = orm.model('OfferModel');


//investments
//--------------
//Responds to an AJAX call with all a users investments
//---------------------------------------------------------------------------------
exports.investments = function(req, res){
	var username = req.params.id;
	InvestmentModel.findAll({where:{username:username}}).success(function(result){
		if(result != undefined){
			var array = [];
			for(x in result){
				var element = {};
				element.username = result[x].username;
				element.productId = result[x].productId;
				element.numberShares = result[x].numberShares;
				array.push(element);
			}
			res.send(array);
		}
	});

}


//summary
//--------------
//Should respond to an AJAX call with all relevant user account information
//---------------------------------------------------------------------------------
exports.summary = function(req, res){
	var username = req.params.id;
	UserModel.find({where:{username:username}}).success(function(result){
		if(result != undefined){
			var data = {};	
			data.username = result.username;
			data.firstName = result.firstName;
			data.lastName = result.lastName;
			data.liquidAssets = result.liquidAssets;
			data.email = result.email;
			
			res.send(data);
		}
	});
}


//products
//--------------
//Should respond to an AJAX call with all products, used for autocomplete
//---------------------------------------------------------------------------------
exports.products = function(req, res){
	ProductModel.findAll().success(function(result){
		if(result != undefined){
			var array = [];
			for(x in result){
				element = {};
				element.label = result[x].name;
				array.push(element);
			}
			console.log(array)
			res.send(array);
		}
	});
}

//currentBids
//-----------------
//Responds to an AJAX call for all of a users current bids
//----------------------------------------------------------------------------------
exports.currentBids = function(req, res){
	var username = req.params.id;
	BidModel.findAll({where:{username:username}}).success(function(result){
		if(result != undefined){
			var array = [];
			for(x in result){
				element = {};
				element.productId = result[x].productId;
				element.bidTime = result[x].bidTime;
				element.maxAmount = result[x].maxAmount;
				element.numberShares = result[x].numberShares;
				array.push(element);
			}
			console.log(array)
			res.send(array);
		}
	});
}



//pastOffers
//-----------------
//Responds to an AJAX call for all of a users past offers
//----------------------------------------------------------------------------------
exports.pastOffers = function(req, res){
	var username = req.params.id;
	OfferModel.findAll({where:{username:username}}).success(function(result){
		if(result != undefined){
			var array = [];
			for(x in result){
				element = {};
				element.productId = result[x].productId;
				element.offerTime = result[x].offerTime;
				element.minAmmount = result[x].minAmmount;
				element.numberShares = result[x].numberShares;
				array.push(element);
			}
			console.log(array);
			res.send(array);
		}
	});
}



//findProduct
//-----------------
//Takes a product name and find all products that can match that name
//
//example: if the user types 'c' into the search field, any product with c
//in its name will be returned
//----------------------------------------------------------------------------------
exports.findProduct = function(req, res){
	var productName = req.params.name;
	productName = '%'+productName+'%';
	ProductModel.findAll({where: ["name LIKE ?", productName]}).success(function(result){
		if(result != undefined){
			var array = [];
			for(x in result){
				element = {};
				element.id = result[x].id;
				element.name = result[x].name;
				element.description = result[x].description;
				element.lastSellPrice = result[x].lastSellPrice;
				element.numberShares = result[x].numberShares;
				element.ipoTime = result[x].ipoTime;
				array.push(element);
			}
			console.log(array);
			res.send(array);
		}
	});
}



//findInvestment
//-----------------
//Takes a productId and a username and finds all investments that can match that productId
//
//example: if the user types '1' into the search field, any investment with 1
//in its productId and that the user in invested in, will be returned
//----------------------------------------------------------------------------------
exports.findInvestment = function(req, res){
	var username = req.params.id;
	var productName = '%'+req.params.name+'%';
	InvestmentModel.findAll({where: ["username = ? AND productId LIKE ?", username, productName]}).success(function(result){
		if(result != undefined){
			var array = [];
			for(x in result){
				var element = {};
				element.productId = result[x].productId;
				element.numberShares = result[x].numberShares;
				array.push(element);
			}
			console.log(array)
			res.send(array);
		}
	});

}

//newProduct
//--------------------
//Adds a new product to the database
//----------------------------------------------------------------------
exports.newProduct = function(req, res){
	var newData = {};
	newData.discovererId = req.body.discovererId;
	newData.name = req.body.name;
	newData.description = req.body.description;
	newData.lastSellPrice = 10;
	newData.numberShares = 1000;
	newData.picture = '';
	newData.ipoTime = '0000-00-00 00:00:00';
	ProductModel.create(newData).success(function(){
		console.log(newData)
		res.send(newData);
	});
}


//newBid
//--------------------
//Adds a new bid to the database
//It also updates the investments of the User placing the bid
//
//TODO dont make it assume the bid goes through
//TODO make it need to interact with other users to buy the stock
//TODO make it affect the stokpile world at large (stock price, shares left, etc)
//----------------------------------------------------------------------
exports.newBid = function(req, res){
	var newData = {};
	newData.productId = req.body.productId;
	newData.maxAmount = req.body.maxAmount;
	newData.username = req.body.username;
	newData.numberShares = req.body.numShares;
	if(newData.numberShares < 0){
		newData.numberShares *= -1;
	}
	newData.bidTime = req.body.bidTime;
	newData.success = req.body.success;
	BidModel.create(newData).success(function(){
		console.log(newData)
		res.send(newData);
	});
	var newInvestment = {};
	newInvestment.username = req.body.username;
	newInvestment.productId = req.body.productId;
	newInvestment.bidTime = req.body.bidTime;
	newInvestment.numberShares = req.body.numShares;
	InvestmentModel.find({where:{username:newInvestment.username, productId:newInvestment.productId}}).success(function(investment){
		if(investment == undefined){
			InvestmentModel.create(newInvestment);
		}else{
			var original = Number(investment.numberShares);
			var toAdd = Number(newData.numberShares);
			var newTotal = original + toAdd;
			investment.numberShares = newTotal;
			investment.createdAt = '0000-00-00 00:00:00';
			investment.save();
		}
	});
}



//newOffer
//--------------------
//Adds a new offer to the database
//It also updates the investments of the User placing the bid
//
//TODO dont make it assume the offer goes through
//TODO make it need to interact with other users to sell the stock
//TODO make it affect the stokpile world at large (stock price, shares left, etc)
//----------------------------------------------------------------------
exports.newOffer = function(req, res){
	var newData = {};
	newData.productId = req.body.productId;
	newData.minAmmount = req.body.minAmount;
	newData.username = req.body.username;
	newData.numberShares = req.body.numShares;
	if(newData.numberShares < 0){
		newData.numberShares = 1;
	}
	newData.offerTime = req.body.offerTime;
	newData.success = req.body.success;
	var sharesLeft = (req.body.curNumShares)-newData.numberShares;
	if(sharesLeft < 1){
		newData.numberShares = req.body.curNumShares;
		OfferModel.create(newData);
		InvestmentModel.find({where:{username:newData.username, productId:newData.productId}}).success(function(investment){
			investment.destroy();	
		});
	}else{
		OfferModel.create(newData);
		InvestmentModel.find({where:{username:newData.username, productId:newData.productId}}).success(function(investment){
			investment.numberShares = sharesLeft;
			investment.createdAt = '0000-00-00 00:00:00';
			investment.save();
		});
	}
	res.send(newData);
}



