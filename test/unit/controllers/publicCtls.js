

//TESTING: Public Pages
//----------------------------------------------------------------------
//Welcome Page
//Signup Page
//Signin Page

describe('Public Pages Controllers', function(){

	//Set up for all controllers
	//---------------------------------------------------------------------------
	
	var $scope;
	var $controller;
	beforeEach(module('myApp'));
	beforeEach(inject(function($injector){
		$scope = $injector.get('$rootScope');
		$controller = $injector.get('$controller');
	}));
	
	//Tests for SigninCtl
	//---------------------------------------------------------------------------

	describe('SigninCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope,
			};
			ctrl = $controller('SigninCtl', params);
		});

		it('shoud have something', function(){
			
		});

	});

	//Tests for SignupCtl
	//---------------------------------------------------------------------------
	
	describe('SignupCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('SignupCtl', params);
		});

		it('shoud have something', function(){
			
		});
	});

});

