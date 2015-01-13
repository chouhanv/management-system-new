'use strict';

/* Controllers */

angular.module('myApp.usersController', [])
.controller('usersController', function( $rootScope, $scope, $window, $location,$http, fileReader) {
	
	$rootScope.adminUser = {
		first_name : "",
		last_name : "",
		email :"",
		password : "",
		confirm_password:"",
		role : "Manager",
		is_active : "Inactive",
		imageSrc :""
	}

	// $rootScope.getAdminUsers = function(){
	// 	$rootScope.initTabs = function(){
	// 		$("ul.nav-tabs a").click(function (e) {
	// 		  e.preventDefault();  
	// 		    $(this).tab('show');
	// 		});
	// 	}
	// }

	$rootScope.resetAdminUser = function(){
		$scope.adminuser_form_submited = false;
		$rootScope.adminUser.first_name = "";
		$rootScope.adminUser.last_name = "";
		$rootScope.adminUser.email = "";
		$rootScope.adminUser.password = "";
		$rootScope.adminUser.confirm_password = "";
		$rootScope.adminUser.role = "Manager";
		$rootScope.adminUser.is_active = "Inactive";
		$rootScope.adminUser.imageSrc = "";
	}

	$rootScope.getAdminUsers = function(){
		$http.get('/getAdminUsers')
		.success(function(data){
			if(data.success){
				$rootScope.adminUsers = data.adminUsers;
			} else {
				console.log(data);
			}
		})
		.error(function(error){
			console.log(error);
		});
	}

	$rootScope.getUserFile = function (file) {
		$rootScope.progress = 0;
		fileReader.readAsDataUrl(file, $rootScope)
	  		.then(function(result) {
	      	$rootScope.adminUser.imageSrc = result;
	  });
	}

	$rootScope.saveAdminUser = function(form){
		$scope.adminuser_form_submited = true;
		if(form.$valid){
			$rootScope.userMessage = "Please wail saving user...";
			$http.post('/saveAdminUsers', $rootScope.adminUser)
			.success(function(data){
				if(data.success){
					$rootScope.getAdminUsers();
					$rootScope.userMessage = "User saved successfully.";
					setTimeout(function(){
						console.log("from here");
						$(".close_model_popup").click();
						$rootScope.userMessage = "";
						$rootScope.resetAdminUser();
						$rootScope.$apply();
					},500);
				} else {
					$rootScope.userMessage = "Please try again.";
					console.log(data);
				}
			});
		}
	}

	$rootScope.deleteAdminUser = function(user){
		user.is_deleted = true;
		user.is_active = "Inactive";
		$http.post('/saveAdminUsers', user)
		.success(function(data){
			if(data.success){
				$rootScope.getAdminUsers();
			} else {
				$rootScope.userMessage = "Please try again.";
				console.log(data);
			}
		});
	}

	$rootScope.editUser = function(user){
		$rootScope.adminUser = angular.copy(user);
	}

	$rootScope.getAdminUsers();

});

