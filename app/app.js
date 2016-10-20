(function(angular) {
	'use strict';

// Declare app level module which depends on views, and components
	var myApp=angular.module('myApp', [
	  'ngRoute',
	  'in_theaters',
	  'dir'
]);
	myApp.config(['$routeProvider', function($routeProvider) {
	  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
	}]);

	myApp.controller('formController',['$scope','$route',function($scope,$route){
		$scope.input='';
		$scope.search=function () {
			$route.updateParams({module:'search',q:$scope.input});
		}
	}]);
/*
	myApp.controller('myController', ['$scope','$location', function($scope,$location){
		$scope.location=$location
		$scope.$watch('location.path()',function(now){
			$scope.path=now;
		})
	}]);*/

})(angular);