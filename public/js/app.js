'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/welcome', {templateUrl: 'partials/welcome', controller: WelcomeCtl});
    $routeProvider.when('/signup', {templateUrl: 'partials/signup', controller: SignupCtl});
    $routeProvider.otherwise({redirectTo: '/welcome'});
    $locationProvider.html5Mode(true);
  }]);
