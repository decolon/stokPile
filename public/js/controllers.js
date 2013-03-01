'use strict';

/* Controllers */
angular.module('myApp.services', [])
	.service('emailService', function (){
		var text = 'test';
		return{
			getEmail:function (){
				return text;
			},
			setEmail:function(data){
				text = data;
			}

		};
	});



function AppCtrl($scope, emailService) {
}

function WelcomeCtl($scope, emailService) {
	$scope.save = function(){
		emailService.setEmail($scope.email);
	}
}
WelcomeCtl.$inject = [$scope, emailService];


function SignupCtl($scope, emailService) {
	$scope.emailValue = emailService.getEmail();
}
SignupCtl.$inject = [$scope, emailService];


