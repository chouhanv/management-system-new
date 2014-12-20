'use strict';

/* Controllers */

angular.module('myApp.homeController', [])
.controller('homeController', function( $rootScope, $scope, $window, $location,$http) {

	$rootScope.changePath = function(path){
		$location.path(path);
	}

	$http.get('/getContacts')
    .success(function(data){
    	if (data.success) {
			$rootScope.allContactes = data.contactes;
		}
    })
    .error(function(error){
    	console.log(error);
    });
	
});

