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

//UserCtl
//---------------------------------------------------------------------------

function UserCtl($scope){
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
	
}
UserCtl.$inject = ['$scope'];

//InvestCtl
//---------------------------------------------------------------------------

function InvestCtl($scope){
	var subPage = 'partials/newInvestment';
	$scope.toNewInvestment = function(){
		subPage = 'partials/newInvestment';
	};
	$scope.toCurrentBids = function(){
		subPage = 'partials/currentBids';
	};
	$scope.toOptionList = function(){
		subPage = 'partials/optionList';
	};
	$scope.toItemPage = function(){
		subPage = 'partials/investItemPage';
	};
	$scope.toAddItem = function(){
		subPage = 'partials/addItemPage';
	};
	$scope.getPage = function(){
		return subPage;
	};
	
}
InvestCtl.$inject = ['$scope'];

//SellCtl
//---------------------------------------------------------------------------

function SellCtl($scope){

	//Sell Sub Pages
	//-------------------------------------------
	var subPage = 'partials/newOffer';
	$scope.toNewOffer = function(){
		subPage = 'partials/newOffer';
	};
	$scope.toPastOffers = function(){
		subPage = 'partials/pastOffers';
	};
	$scope.toSellOptionList = function(){
		subPage = 'partials/optionList';
	};
	$scope.toItemPage = function(){
		subPage = 'partials/sellItemPage';
	};
	$scope.getPage = function(){
		return subPage;
	};

	//Sell Main
	//------------------------------------------
	
}
SellCtl.$inject = ['$scope'];






