describe('User Controllers', function(){

	//Set up for all controllers
	//---------------------------------------------------------------------------
	
	var $scope;
	var $controller;
	beforeEach(module('myApp'));
	beforeEach(inject(function($injector){
		$scope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
	}));
	
	//Tests for UserCtl
	//---------------------------------------------------------------------------
	
	describe('UserCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('UserCtl', params);
		});

		it('shoud have something', function(){
			
		});
	});

	//Tests for UserSummaryCtl
	//---------------------------------------------------------------------------
	
	describe('UserSummaryCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('UserSummaryCtl', params);
		});

		it('should exist', function(){
		
		});
	});

	//Tests for UserInvestmentCtl
	//---------------------------------------------------------------------------
	
	describe('UserInvestmentCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('UserInvestmentCtl', params);
		});

		it('should exist', function(){
		
		});
	});

});
