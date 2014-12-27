'use strict';

/* Controllers */

angular.module('myApp.usersController', [])
.controller('usersController', function( $rootScope, $scope, $window, $location,$http) {
	console.log("user controller");

	$rootScope.getAdminUsers = function(){
		$rootScope.initTabs = function(){
			$("ul.nav-tabs a").click(function (e) {
  e.preventDefault();  
    $(this).tab('show');
});
		}
	}

});

