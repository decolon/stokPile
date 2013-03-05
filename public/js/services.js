'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');



//emailService
//----------------------------------------------------------
//This service takes an email entered in one controller and
//makes it available to another controller
//
//TODO: make more general, use to save anything and make it available
angular.module('myApp.services', [])
	.service('emailService', function (){
		var text = 'START VALUE';
		return{
			getEmail:function (){
				return text;
			},
			setEmail:function(data){
				text = data;
			}

		};
	});



