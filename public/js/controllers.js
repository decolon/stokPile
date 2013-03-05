'use strict';

/* Controllers */

function AppCtrl($scope, emailService) {
}

//WelcomeCtl
//----------------------------------------------------------------------------

function WelcomeCtl($scope, emailService) {
	$scope.save = function(){
		emailService.setEmail($scope.email);
	}
}
WelcomeCtl.$inject = ['$scope', 'emailService'];

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

