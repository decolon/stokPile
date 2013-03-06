//Testing Stokpile controllers
//
//controllers located at public/js/controllers.js
//

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
	
	//Tests for SignupCtl
	//---------------------------------------------------------------------------

	describe('SignupCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope,
				emailService: jasmine.createSpyObj('emailService', ['getEmail'])
			};
			ctrl = $controller('SignupCtl', params);
		});

		it('should call emailService.getEmail', function(){
			expect(params.emailService.getEmail).toHaveBeenCalled();
		});

		it('should not not have START VALUE in emailValue', function(){
			expect($scope.emailValue).not.toBe('START VALUE');
		});
	});

	//Tests for SigninCtl
	//---------------------------------------------------------------------------
	
	describe('SignupCtl', function(){
		var ctrl, params;
		beforeEach(function(){
			params = {
				$scope: $scope
			};
			ctrl = $controller('SigninCtl', params);
		});

		it('shoud have something', function(){
			
		});
	});
});
