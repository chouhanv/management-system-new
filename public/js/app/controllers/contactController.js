'use strict';

/* Controllers */

angular.module('myApp.contactController', [])
.controller('contactController', function( $rootScope, $scope, $window, $location,$http) {

	$scope.isEditForm = false;
		$rootScope.tabs = [];
		$rootScope.tabContent = [];
		$scope.openedTabs = [];
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

		$scope.items=["item1","item2","item3"],


		$rootScope.getFile = function (file) {
			console.log(file);
        $rootScope.progress = 0;
        fileReader.readAsDataUrl(file, $rootScope)
          .then(function(result) {
              $rootScope.imageSrc = result;
          });
	    };
	 
	    $rootScope.$on("fileProgress", function(e, progress) {
	        $scope.progress = progress.loaded / progress.total;
	    });


		$scope.open=function(templateUrl,index,type) {
			if (type== "phonetype"){
				$rootScope.phonepop = $rootScope.phones[index];
			};
			if (type == "addresstype"){
				$rootScope.addresspop = $rootScope.addreses[index];
			};
			var modalInstance;
			modalInstance=$modal.open({
				templateUrl:templateUrl, controller:"ModalInstanceCtrl", 
				resolve:{
					items:function(){
						return $scope.items
					}
				}
			}), modalInstance.result.then(function(selectedItem){
				$scope.selected=selectedItem
			}, function(){
            		//$log.info("Modal dismissed at: "+new Date)
            	}
        )},
		$scope.saveContact = function(form) {
			$scope.contact_form_submited = true;

		   	if(form.$valid){
		   		console.log($rootScope.category_id);
		   		$scope.contactdata = {
		   			category_id : $rootScope.category_id,
			   		addreses:$rootScope.addreses,
			   		company:$rootScope.company,
			   		phones:$rootScope.phones,
			   		name:$rootScope.name,
			   		emails:$rootScope.emails,
			   		refferedbys:$rootScope.refferedbys,
			   		notes:$rootScope.notes,
			   		additionalfields:$rootScope.additionalfields,
			   		imageSrc : $rootScope.imageSrc
			   	};
			   	$http.post('/createContact',{contactdata : $scope.contactdata})
			   	.success(function(data){
			   		if (data){
			   				$rootScope.message = data.message;
		   			}
		   			else {
		   				$rootScope.message = "Try Again";
		   			}
			   	})
			   	.error(function(error){
			   		console.log(error)
			   	});
			}
		}

		$scope.updateContact = function(form, index){
			$scope.contact_form_submited = true;

		   	if(form.$valid){
		   		var contact_id;
		   		for(var x=0; x<$scope.openedTabs.length; x++){
					if(x == index){
						contact_id = $scope.openedTabs[x];
					}
				}

		   		$scope.contactdata = {
		   			contact_id:contact_id,
		   			category_id : $rootScope.category_id,
			   		addreses:$rootScope.addreses,
			   		company:$rootScope.company,
			   		phones:$rootScope.phones,
			   		name:$rootScope.name,
			   		emails:$rootScope.emails,
			   		refferedbys:$rootScope.refferedbys,
			   		notes:$rootScope.notes,
			   		additionalfields:$rootScope.additionalfields,
			   		imageSrc : $rootScope.imageSrc
			   	};
			   	$http.post('/updateContact',{contactdata : $scope.contactdata})
			   	.success(function(data){
			   		if (data){
		   				$rootScope.message = data.message;
		   				$scope.getContact();
	   				}
		   			else {
		   				$rootScope.message = "Try Again";
		   			}
			   	})
			   	.error(function(error){
			   		console.log(error)
			   	});
			}
		}

		$scope.expandPhone = function() {
		   	$rootScope.phones.push({
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
			});
	   	}

	   $scope.expandAddress = function() {
	   	$rootScope.addreses.push({
	   		
	   	});
	   }

	   $scope.expandEmail = function() {
	   	$rootScope.emails.push("");
	   }

	   $scope.expandrefferedby = function() {
	   	$rootScope.refferedbys.push("");
	   }

	   $scope.expandNote = function() {
	   	$rootScope.notes.push("");
	   }

	   $scope.addAitionalFiel = function(key){
	   	$rootScope.additionalfields.push({key:key,value:""});
	   }

		$scope.showtab = function(index){
				
			$(".active").removeClass("active");
			setTimeout(function(){
				$("#tab"+index).addClass('active');
			},  100);

			$scope.isEditForm = true;
			$scope.editFormIndex = index;

			$rootScope.category_id = $rootScope.tabs[index].contact.category_id
	   		$rootScope.addreses = $rootScope.tabs[index].contact.addreses
	   		$rootScope.company = $rootScope.tabs[index].contact.company
	   		$rootScope.phones = $rootScope.tabs[index].contact.phones
	   		$rootScope.name = $rootScope.tabs[index].contact.name
	   		$rootScope.emails = $rootScope.tabs[index].contact.emails
	   		$rootScope.refferedbys = $rootScope.tabs[index].contact.refferedbys
	   		$rootScope.notes = $rootScope.tabs[index].contact.notes
	   		$rootScope.additionalfields = $rootScope.tabs[index].contact.additionalfields
	   		$rootScope.imageSrc = $rootScope.tabs[index].contact.imageSrc
		}

		
		$scope.createNewTab = function(contact){
			var isOpened = false;
			var index = 0;
			for(var x=0; x<$scope.openedTabs.length; x++){
				if($scope.openedTabs[x] == contact._id){
					isOpened = true;
					index = x;
				}
			}

			if(!isOpened){
				var tab = {
					title : contact.name.firstname+" "+contact.name.middlename + " " + contact.name.lastName,
					contact : contact
				}
				$rootScope.tabs.push(tab);
				$rootScope.tabContent.push(contact);
				$scope.openedTabs.push(contact._id);
				index = $scope.openedTabs.length-1;
			}
			$scope.showtab(index);
		}

		$scope.showList = function(){
			$scope.isEditForm = false;
			$(".active").removeClass("active");

			setTimeout(function(){
				$("#home").addClass('active');
			},  100);
		}

		$scope.discardContact = function(index){

			$rootScope.tabs.splice(index, 1);
			$rootScope.tabContent.splice(index, 1);
			$scope.openedTabs.splice(index, 1);

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
	   		$(".active").removeClass("active");

			setTimeout(function(){
				$("#home").addClass('active');
			},  100);
		}

		$scope.removeAdditionalField = function(index){
			angular.forEach($rootScope.additionalfields, function(val, i){
				if(i==index){
					$rootScope.additionalfields.splice(i,1);
				}
			});
		}

		$scope.removeRefferedbys = function(index){
			angular.forEach($rootScope.refferedbys, function(val, i){
				if(i==index){
					$rootScope.refferedbys.splice(i,1);
				}
			});
		}

		$scope.removeEmails = function(index){
			angular.forEach($rootScope.emails, function(val, i){
				if(i==index){
					$rootScope.emails.splice(i,1);
				}
			});
		}

		$scope.removePhones = function(index){
			angular.forEach($rootScope.phones, function(val, i){
				if(i==index){
					$rootScope.phones.splice(i,1);
				}
			});
		}

		$scope.removeAddress = function(index){
			angular.forEach($rootScope.addreses, function(val, i){
				if(i==index){
					$rootScope.addreses.splice(i,1);
				}
			});
		}

		$scope.getContact = function(){
		    $http.post('/getContact',{category_id : $rootScope.category_id})
		    .success(function(data){
		    	if (data) {
		    			$rootScope.getcontactdata = data;
		    		}
		    })
		    .error(function(error){
		    	console.log(error);
		    });
		}

		$rootScope.setContactCategory = function(data,id){
	 	    $rootScope.categorie = data;
	 	    $rootScope.category_id = id;
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
	
});

