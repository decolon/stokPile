'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngResource','myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.
    when('/signin', {templateUrl: 'partials/signin', controller: SigninCtl}).
    when('/signup', {templateUrl: 'partials/signup', controller: SignupCtl}).
	when('/user/:id', {templateUrl: 'partials/user', controller: UserCtl}).
    when('/invest/:id', {templateUrl: 'partials/invest', controller: InvestCtl}).
    when('/sell/:id', {templateUrl: 'partials/sell', controller: SellCtl}).
    otherwise({redirectTo: '/signin'});
    $locationProvider.html5Mode(true);
  }]);
