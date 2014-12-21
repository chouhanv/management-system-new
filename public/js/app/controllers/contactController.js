'use strict';

/* Controllers */

angular.module('myApp.contactController', [])
.controller('contactController', function( $rootScope, $scope, $window, $location,$http, fileReader) {

	$scope.filterBy = "";
	$scope.setFilterBy = function(filterBy){
		$scope.filterBy = filterBy;
	}

	$scope.formEditMode = false;
	$scope.createMode = false;

	$rootScope.isEditForm = false;
		$rootScope.tabs = [];
		$rootScope.tabContent = [];
		$rootScope.openedTabs = [];
		$scope.editFormIndex = "";
		$rootScope.prospective_client = false;
		$rootScope.imageSrc = "";
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
			console.log(form);
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
			   		imageSrc : $rootScope.imageSrc,
			   		prospective_client : $rootScope.prospective_client
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

		$scope.initContactContactCategory = function(category){
			$rootScope.category_id = category._id;
			$rootScope.category = category;
		}

		$scope.submitContact = function(form, index){
			$scope.contact_form_submited = true;
			console.log($rootScope.category_id);
		   	if(form.$valid){
		   		var contact_id;
		   		for(var x=0; x<$rootScope.openedTabs.length; x++){
					if(x == index){
						contact_id = $rootScope.openedTabs[x];
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
			   		imageSrc : $rootScope.imageSrc,
			   		prospective_client:$rootScope.prospective_client
			   	};
			   	if(contact_id == 'new'){
			   		$http.post('/createContact',{contactdata : $scope.contactdata})
				   	.success(function(data){
				   		if (data){
				   			$rootScope.message = data.message;
				   			$rootScope.getContacts();
				   			$scope.showList();
			   			}
			   			else {
			   				$rootScope.message = "Try Again";
			   			}
				   	})
				   	.error(function(error){
				   		console.log(error)
				   	});
			   	} else {
			   		$http.post('/updateContact',{contactdata : $scope.contactdata})
				   	.success(function(data){
				   		if (data){
			   				$rootScope.message = data.message;
			   				$scope.showList();
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

			$scope.formEditMode = true;
			$scope.createMode = false;

			$(".active").removeClass("active");
			setTimeout(function(){
				$("#tab"+index).addClass('active');
			},  100);

			$rootScope.isEditForm = true;
			$scope.editFormIndex = index;
			$rootScope.category_id = $rootScope.tabs[index].contact.category_id._id;
	   		$rootScope.addreses = $rootScope.tabs[index].contact.addreses;
	   		$rootScope.company = $rootScope.tabs[index].contact.company;
	   		$rootScope.phones = $rootScope.tabs[index].contact.phones;
	   		$rootScope.name = $rootScope.tabs[index].contact.name;
	   		$rootScope.emails = $rootScope.tabs[index].contact.emails;
	   		$rootScope.refferedbys = $rootScope.tabs[index].contact.refferedbys;
	   		$rootScope.notes = $rootScope.tabs[index].contact.notes;
	   		$rootScope.additionalfields = $rootScope.tabs[index].contact.additionalfields;
	   		$rootScope.imageSrc = $rootScope.tabs[index].contact.imageSrc;
	   		$rootScope.prospective_client = $rootScope.tabs[index].contact.prospective_client;
		}

		$scope.newContact = function(){
			//$rootScope.category_id = category_id;
			$scope.formEditMode = false;
			$scope.createMode = true;
			var isOpened = false;
			var index = 0;
			for(var x = 0; x<$rootScope.openedTabs.length;x++){
				if($rootScope.openedTabs[x] == 'new'){
					isOpened = true;
					index = x;
				}
			}

			if(!isOpened){
				var tab = {
					title : "New Contact",
					contact : {
						category_id:$rootScope.category,
						addreses : [{
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
						    }],
					    name : {
					      prefix:"",
					      firstname:"",
					      lastName:"",
					      middlename:"",
					      suffix:"",
					      initial:"",
					      sortname:"",
					      additinalname:"",
					      lettersalutation:""

					    },
					    phones : [{
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
					    }],
					    company : {
					      companyname:"",
					      dbaname:"",
					      namephonetic:"",
					      taxid:""
					    },
					    emails : [""],
					    refferedbys : [""],
					    notes : [""],

					    additionalfields : [],
					    isAdditionalFields : false,
					    prospective_client:false,
					    imageSrc:""
					}
				}
				$rootScope.tabs.push(tab);
				$rootScope.tabContent.push({});
				$rootScope.openedTabs.push('new');
				index = $rootScope.openedTabs.length - 1;
			}
			$scope.showtab(index);
		}
		
		$scope.createNewTab = function(contact){
			var isOpened = false;
			var index = 0;
			for(var x=0; x<$rootScope.openedTabs.length; x++){
				if($rootScope.openedTabs[x] == contact._id){
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
				$rootScope.openedTabs.push(contact._id);
				index = $rootScope.openedTabs.length-1;
			}
			$scope.showtab(index);
		}

		$scope.showList = function(){
			$scope.formEditMode = false;
			$scope.createMode = false;
			$rootScope.isEditForm = false;
			$(".active").removeClass("active");

			setTimeout(function(){
				$("#home").addClass('active');
			},  100);

			$rootScope.prospective_client = false;
			$rootScope.imageSrc = "";
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

		}

		$scope.discardContact = function(index){

			$rootScope.tabs.splice(index, 1);
			$rootScope.tabContent.splice(index, 1);
			$rootScope.openedTabs.splice(index, 1);

			$rootScope.addreses = [];
	   		$rootScope.phones = [];
	   		$rootScope.name = [];
	   		$rootScope.emails = [];
	   		$rootScope.refferedbys = [];
	   		$rootScope.notes = [];
	   		$rootScope.company = [];
	   		$rootScope.additionalfields = [];
	   		$rootScope.imageSrc="";
	   		$rootScope.prospective_client = false;
	   		$rootScope.isEditForm = false;
	   		$rootScope.imageSrc = "";
	   		$rootScope.prospective_client = false;
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


		$scope.formValidater = function(){
			var jvalidate = $("#jvalidate").validate({
                ignore: [],
                rules: {                                            
                    login: {
                            required: true,
                            minlength: 2,
                            maxlength: 8
                    },
                    password: {
                            required: true,
                            minlength: 5,
                            maxlength: 10
                    },
                    're-password': {
                            required: true,
                            minlength: 5,
                            maxlength: 10,
                            equalTo: "#password2"
                    },
                    age: {
                            required: true,
                            min: 18,
                            max: 100
                    },
                    email: {
                            required: true,
                            email: true
                    },
                    date: {
                            required: true,
                            date: true
                    },
                    credit: {
                            required: true,
                            creditcard: true
                    },
                    site: {
                            required: true,
                            url: true
                    }
                }                                        
            });  
		}
});

