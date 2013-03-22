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

//
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



