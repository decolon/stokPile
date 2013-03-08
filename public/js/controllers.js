'use strict';

/* Controllers */

function AppCtrl($scope, emailService) {
}

//SignupCtl
//----------------------------------------------------------------------------

function SignupCtl($scope, emailService) {
	$scope.emailValue = emailService.getEmail();
}
SignupCtl.$inject = ['$scope', 'emailService'];

//SigninCtl
//---------------------------------------------------------------------------

function SigninCtl($scope){
	
}
SigninCtl.$inject = ['$scope'];

//UserCtl
//-------------------------------------------------------------------------

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
//-------------------------------------------------------------------------

function InvestCtl($scope){
	var subPage = 'partials/newInvestment';
	$scope.toNewInvestments = function(){
		subPage = 'partials/newInvestment';
	};
	$scope.toCurrentBids = function(){
		subPage = 'partials/currentBids';
	};
	$scope.getPage = function(){
		return subPage;
	};
}
InvestCtl.$inject = ['$scope'];


//SellCtl
//-------------------------------------------------------------------------

function SellCtl($scope){
	var subPage = 'partials/newOffer';
	$scope.toNewOffers = function(){
		subPage = 'partials/newOffer';
	};
	$scope.toPastOffers = function(){
		subPage = 'partials/pastOffers';
	};
	$scope.getPage = function(){
		return subPage;
	};
}
SellCtl.$inject = ['$scope'];




