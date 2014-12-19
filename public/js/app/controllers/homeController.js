'use strict';

/* Controllers */

angular.module('myApp.homeController', [])
.controller('homeController', function( $rootScope, $scope, $window, $location,$http) {

	$scope.changePath = function(path){
		$location.path(path);
	}
	
});

