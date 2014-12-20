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
 	    $rootScope.categorie = categorie;
 	    $rootScope.category_id = categorie._id;


    $rootScope.isEditForm = false;
    $rootScope.tabs = [];
    $rootScope.tabContent = [];
    $rootScope.openedTabs = [];
    $scope.editFormIndex = "";

    $rootScope.addreses = [{
      addressline1 : "",
      addressline2 : "",
      city         : "",
      state        : "",
      zip          : "",
      addresstype  : "",
      mailing      : false,
      billing      : false,
      poboxno      : false,
      streetnumber : "",
      streetname   : "",
      streetsuffix : "",
      unitnumber   : "",
      unitdesignator : "",
      buildingnumber  : "",
      buildingdoorcode : "",
      buildingdoorbell : "",
      pobox            : "",
      streetnameaka    : "",
      Intersectingstreet1 : "",
      Intersectingstreet2 : "",
      neighborhood        : ""
    }];
    $rootScope.name = {
      prefix:"",
      firstname:"",
      lastName:"",
      middlename:"",
      suffix:"",
      initial:"",
      sortname:"",
      additinalname:"",
      lettersalutation:""

    };
    $rootScope.phones = [{
               phonetype : "",
               sms : false,
               mms : false,
               smartphone : false,
               country : "",
               area    : "",
               Number  : "",
               ext      : "",
               homephone : "",
               cellphone : ""
    }];
    $rootScope.company = {
      companyname:"",
      dbaname:"",
      namephonetic:"",
      taxid:""
    };
    $rootScope.emails = [""];
    $rootScope.refferedbys = [""];
    $rootScope.notes = [""];

    $rootScope.additionalfields = [];
    $rootScope.isAdditionalFields = false;

 	  //   $rootScope.addreses = [];
   	// 	$rootScope.phones = [];
   	// 	$rootScope.name = [];
   	// 	$rootScope.emails = [];
   	// 	$rootScope.refferedbys = [];
   	// 	$rootScope.notes = [];
   	// 	$rootScope.company = [];
   	// 	$rootScope.additionalfields = [];
   	// 	$rootScope.imageSrc="";

   	// 	$rootScope.isEditForm = false;
		  // $rootScope.tabs = [];
		  // $rootScope.tabContent = [];
		  // $scope.openedTabs = [];
		  // $scope.editFormIndex = "";

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

