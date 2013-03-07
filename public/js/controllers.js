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
	
}
UserCtl.$inject = ['$scope'];

