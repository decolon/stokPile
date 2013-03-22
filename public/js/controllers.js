'use strict'

//SignupCtl
//----------------------------------------------------------------------------
function SignupCtl($scope, DatabaseService) {
	var orm = require('singleton.js');
	$scope.test = orm.models();
}
SignupCtl.$inject = ['$scope', 'DatabaseService'];

//SigninCtl
//---------------------------------------------------------------------------
function SigninCtl($scope){
	
}
SigninCtl.$inject = ['$scope'];




//LoggedInCtl
//---------------------------------------------------------------------------
function LoggedInCtl($scope, $routeParams){

	//change all a elements to get the correct user and greet user
	var updated = false;
	$scope.loggedInUser = function(){
		if(!updated){
			var username = $routeParams.id;
			if(username != undefined){
				$('a').attr("href", function(){
					return $(this).attr("href") + '/' + $routeParams.id;
				});
				updated = true;
			}
		}
		return $routeParams.id;
	}

}
LoggedInCtl.$inject = ['$scope', '$routeParams'];





//UserCtl
//---------------------------------------------------------------------------
function UserCtl($scope){
	//User Sub Pages
	//-------------------------------------
	var subPage = 'partials/userSummary';
	$scope.toSummary = function(){
		subPage = 'partials/userSummary';
	};
	$scope.toInvestments = function(){
		subPage = 'partials/userInvestments';
	};
	$scope.getPage = function(){
		return subPage;
	};

	//User Main
	//-------------------------------------------
	
	
}
UserCtl.$inject = ['$scope'];

//InvestCtl
//---------------------------------------------------------------------------
function InvestCtl($scope, $resource){

	//Invest Sub Pages
	//-------------------------------------
	var subPage = 'partials/newInvestment';
	$scope.toNewInvestment = function(){
		subPage = 'partials/newInvestment';
	};
	$scope.toCurrentBids = function(){
		subPage = 'partials/currentBids';
	};
	//Deals with rendering the page after searching.
	//TODO: make this nicer 
	//TODO DECOMPOSE
	//TODO: dont ajax every time the page changes
	$scope.productsSearch = function(){
		var text = $('#productSearch').val();
		if(text == ''){
			text = '%';	
		}
		var product = $resource('invest/:name/products');
		var responce = product.query({name:text}, function(data){
			if(data.length == 1){
				$scope.itemData = data[0];
				subPage = 'partials/investItemPage';
			}else if(data.length > 1){
				$scope.data = data;
				subPage = 'partials/optionList';
			}else{
				subPage = 'partials/newInvestment';			
			}
		});
	};
	$scope.toItemPage = function(productId){
		var data = $scope.data;
		for(var i=0; i<data.length; i++){
			if(data[i].productId == productId){
				$scope.itemData = data[i];
			}
		}
		subPage = 'partials/investItemPage';
	};
	$scope.toAddItem = function(){
		subPage = 'partials/addItemPage';
	};
	$scope.addItem = function(){
		var name = $('#name').val();
		var description = $('#description').val();
		var newProduct = $resource('product/new');
		var responce = newProduct.save({discovererId:$scope.loggedInUser(), name:name, description:description}, function(data){
			$scope.itemData = data;
			subPage = 'partials/investItemPage';
		});
	}
	$scope.getPage = function(){
		return subPage;
	};

	//Invest Main
	//----------------------------------

}
InvestCtl.$inject = ['$scope', '$resource'];

//SellCtl
//---------------------------------------------------------------------------
function SellCtl($scope, $resource){

	//Sell Sub Pages
	//-------------------------------------------
	var subPage = 'partials/newOffer';
	$scope.toNewOffer = function(){
		subPage = 'partials/newOffer';
	};
	$scope.toPastOffers = function(){
		subPage = 'partials/pastOffers';
	};
	//Deals with rendering the page after searching.
	//TODO: make this nicer 
	//TODO DECOMPOSE
	//TODO: dont ajax every time the page changes
	$scope.investmentsSearch = function(){
		var text = $('#investmentsSearch').val();
		if(text == ''){
			text = '%';	
		}
		var investments = $resource('user/:id/investments/:name');
		var responce = investments.query({id:$scope.loggedInUser(), name:text}, function(data){
			if(data.length == 1){
				$scope.itemData = data[0];
				subPage = 'partials/sellItemPage';
			}else if(data.length > 1){
				$scope.data = data;
				subPage = 'partials/optionList';
			}else{
				subPage = 'partials/newOffer';			
			}
		});
	};
	$scope.toItemPage = function(productId){
		var data = $scope.data;
		for(var i=0; i<data.length; i++){
			if(data[i].productId == productId){
				$scope.itemData = data[i];
			}
		}
		subPage = 'partials/sellItemPage';
	};
	$scope.getPage = function(){
		return subPage;
	};

	//Sell Main
	//------------------------------------------
	
}
SellCtl.$inject = ['$scope', '$resource'];

//UserInvestmentCtl
//-----------------------------
//This controller populates the user investment page with all the investments
//the user currently has.  It uses angular $resource to asynchronously talk with
//the server
//
//------------------------------------------------------------------------------
function UserInvestmentCtl($scope, $resource){
	var investments = $resource('/user/:id/investments');
	var responce = investments.query({id:$scope.loggedInUser()}, function(data){
		$scope.data = data;
	});
}
UserInvestmentCtl.$inject = ['$scope', '$resource'];


//UserSummaryCtl
//-----------------------------
//This controller populates the user summary page with a summary of all user activity
//It uses angular $resource to asynchronously talk with
//the server
//
//------------------------------------------------------------------------------
function UserSummaryCtl($scope, $resource){
	var summary = $resource('/user/:id/summary');
	var responce = summary.get({id:$scope.loggedInUser()}, function(data){
		$scope.data = data;
	});
}
UserSummaryCtl.$inject = ['$scope', '$resource'];


//NewInvestmentCtl
//-----------------------------
//this controller takes care on the new investment page.  It populates
//the liquid assets with the users liquid assets and it is responsible
//for the auto complete
//------------------------------------------------------------------------------
function NewInvestmentCtl($scope, $resource){
	var summary = $resource('/user/:id/summary');
	var summaryResponce = summary.get({id:$scope.loggedInUser()}, function(data){
		$scope.data = data;
	});

	var products = $resource('invest/api/products/all');
	var productsResponce = products.query({}, function(data){
		$( "#productSearch" ).autocomplete({
			
			source: data
		});
		$scope.products = data;
	});
}
NewInvestmentCtl.$inject = ['$scope', '$resource'];


//CurrentBidsCtl
//-----------------------------
//This controller displays all the current bids a user has
//by sending a $resource object to get the data and then rendering the 
//screen
//------------------------------------------------------------------------------
function CurrentBidsCtl($scope, $resource){
	var bids = $resource('invest/:id/currentBids');
	var responce = bids.query({id:$scope.loggedInUser()}, function(data){
		$scope.currentBids = data;
	});
}
CurrentBidsCtl.$inject = ['$scope', '$resource'];



//PastOffersCtl
//-----------------------------
//This controller displays all the past offers a user has
//by sending a $resource object to get the data and then rendering the 
//screen
//------------------------------------------------------------------------------
function PastOffersCtl($scope, $resource){
	var offers = $resource('sell/:id/pastOffers');
	var responce = offers.query({id:$scope.loggedInUser()}, function(data){
		$scope.pastOffers = data;
	});
}
PastOffersCtl.$inject = ['$scope', '$resource'];


//NewOfferCtl
//-----------------------------
//This controller helps populate the NewOfferCtl, both the main screen and 
//the search field.  It uses AJAX to get all the users investments and then 
//puts that data on the screen and in the searchbar
//------------------------------------------------------------------------------
function NewOfferCtl($scope, $resource){
	var investments = $resource('/user/:id/investments');
	var responce = investments.query({id:$scope.loggedInUser()}, function(data){
		//put the data into a format the autocomplete can understand
		var array = [];
		for(var x=0; x<data.length;x++){
			var element = {};
			element.label = data[x].productId;
			array.push(element);
		}
		$("#investmentsSearch" ).autocomplete({
			source: array
		});
		$scope.canSell = data;
	});
}
NewOfferCtl.$inject = ['$scope', '$resource'];







