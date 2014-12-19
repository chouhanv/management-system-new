'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
.controller('bodyController', function( $rootScope, $scope, $window, $location,$http) {
	$scope.login_data = {
		username:"",
		password:""
	}
	$scope.login = function(form){
		$http.post('/login',$scope.login_data)
		.success(function(data){
			if(data.success){
				$window.location.href = '/home#dashboard';
			} else {
				$scope.login_error = data.error;
			}
		})
		.error(function(error){
			console.log(error);
		});
	}
});

