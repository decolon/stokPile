'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['myApp.filters', 'myApp.services', 'myApp.directives']).
  config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/signin', {templateUrl: 'partials/signin', controller: SigninCtl});
    $routeProvider.when('/signup', {templateUrl: 'partials/signup', controller: SignupCtl});
    $routeProvider.when('/user', {templateUrl: 'partials/user', controller: UserCtl});
    $routeProvider.when('/invest', {templateUrl: 'partials/invest', controller: InvestCtl});
    $routeProvider.when('/sell', {templateUrl: 'partials/sell', controller: SellCtl});
    $routeProvider.otherwise({redirectTo: '/signup'});
    $locationProvider.html5Mode(true);
  }]);
