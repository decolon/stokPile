'use strict';

/* Controllers */

function AppCtrl($scope, emailService) {
}

function SignupCtl($scope, emailService) {
	$scope.emailValue = emailService.getEmail();
}
SignupCtl.$inject = ['$scope', 'emailService'];



