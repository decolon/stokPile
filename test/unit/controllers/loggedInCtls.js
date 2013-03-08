describe('Logged In Controllers', function(){

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

	//Tests for SellCtl
	//---------------------------------------------------------------------------
	
	describe('SellCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('SellCtl', params);
		});

		it('should exist', function(){
		
		});
	});

	//Tests for InvestCtl
	//---------------------------------------------------------------------------
	
	describe('InvestCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('InvestCtl', params);
		});

		it('should exist', function(){
		
		});
	});

});
