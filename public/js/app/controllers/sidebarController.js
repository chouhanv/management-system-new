'use strict';

/* Controllers */

angular.module('myApp.sidebarController', [])
.controller('sidebarController', function( $rootScope, $scope, $window, $location,$http) {

    $http.post('/getCategorie')
     .success(function(data){
		if (data){
			$scope.categories = data.categorie;
		}
		else {
			$scope.message = "Try Again";
		}
    })
	.error(function(error){
		console.log(error);
	});

	$rootScope.setContactCategory = function(categorie){
 	    $rootScope.categorie = categorie.categorie;
 	    $rootScope.category_id = categorie._id;
 	    $rootScope.addreses = [];
   		$rootScope.phones = [];
   		$rootScope.name = [];
   		$rootScope.emails = [];
   		$rootScope.refferedbys = [];
   		$rootScope.notes = [];
   		$rootScope.company = [];
   		$rootScope.additionalfields = [];
   		$rootScope.imageSrc="";

   		$scope.isEditForm = false;
		  $rootScope.tabs = [];
		  $rootScope.tabContent = [];
		  $scope.openedTabs = [];
		  $scope.editFormIndex = "";

 	    $scope.getContact();
    }

    $rootScope.getContact = function(){
      $http.post('/getContact',{category_id : $rootScope.category_id})
      .success(function(data){
        if (data) {
            $rootScope.categoryWiseContact = data.data;
          }
      })
      .error(function(error){
        console.log(error);
      });
  }
});

