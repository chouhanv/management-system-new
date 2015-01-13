'use strict';

/* Controllers */

angular.module('myApp.contactController', [])
.controller('contactController', function( $scope, $rootScope, $window, $location,$http, fileReader) {

	$rootScope.filterBy = "";
	$rootScope.setFilterBy = function(filterBy){
		$rootScope.filterBy = filterBy;
	}

    
	$rootScope.formEditMode = false;
	$rootScope.createMode = false;
	$rootScope.isShowProspectiveClient = {status:false};
	$rootScope.sortBy = "";
	$rootScope.isEditForm = false;
	$rootScope.isEditContact = false;
		$rootScope.tabs = [];
		$rootScope.tabContent = [];
		$rootScope.openedTabs = [];
		$rootScope.editFormIndex = "";
		$rootScope.prospective_client = {status:false};
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

		$rootScope.items=["item1","item2","item3"],

		$rootScope.getFile = function (file) {
        	$rootScope.progress = 0;
        	fileReader.readAsDataUrl(file, $rootScope)
          		.then(function(result) {
              	$rootScope.imageSrc = result;
          });
	    };
	 
	    $rootScope.$on("fileProgress", function(e, progress) {
	        $rootScope.progress = progress.loaded / progress.total;
	    });


		$rootScope.saveContact = function(form) {
			$rootScope.contact_form_submited = true;
		   	if(form.$valid){
		   		$rootScope.contactdata = {
		   			category_id : $rootScope.category_id,
		   			contact_id : $rootScope.contact_id,
		   			emailsclient:$rootScope.emailsclient,

			   		addreses:$rootScope.addreses,
			   		company:$rootScope.company,
			   		phones:$rootScope.phones,
			   		name:$rootScope.name,
			   		emails:$rootScope.emails,
			   		refferedbys:$rootScope.refferedbys,
			   		notes:$rootScope.notes,
			   		additionalfields:$rootScope.additionalfields,
			   		imageSrc : $rootScope.imageSrc,
			   		prospective_client : $rootScope.prospective_client.status
			   	};
			   	$http.post('/createContact',{contactdata : $rootScope.contactdata})
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
		$rootScope.weblogin = {
			email : "",
			password : "",
			is_enabled : false
		}

		 $rootScope.generatePass =function() {
		 	if($rootScope.weblogin.email == "") {alert("Please enter login email."); return;}
		 var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		 var string_length = 6;
		 var genPassword = '';
		 var charCount = 0;
		 var numCount = 0;

		 for (var i=0; i<string_length; i++) {
		      // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
		     if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
		         var rnum = Math.floor(Math.random() * 10);
		         genPassword += rnum;
		         numCount += 1;
		     } else {
		          //If any of the above criteria fail, go ahead and generate an alpha character from the chars string
		         var rnum = Math.floor(Math.random() * chars.length);
		        genPassword += chars.substring(rnum,rnum+1);
		         charCount += 1;
		     }
		 }
		  $rootScope.weblogin.password = genPassword;
		}

		$rootScope.initContactContactCategory = function(category){
			$rootScope.category_id = category._id;
			$rootScope.category = category;
		}

		$rootScope.submitContact = function(form, index){
			// $rootScope.contact_form_submited = true;
		 //   	if(form.$valid){
		   		var contact_id;
		   		for(var x=0; x<$rootScope.openedTabs.length; x++){
					if(x == index){
						contact_id = $rootScope.openedTabs[x];
					}
				}
		   		$rootScope.contactdata = {
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
			   		prospective_client:$rootScope.prospective_client.status
			   	};
			   	if(contact_id == 'new'){
			   		$http.post('/createContact',{contactdata : $rootScope.contactdata})
				   	.success(function(data){
				   		if (data){
				   			$rootScope.message = data.message;
				   			$rootScope.getContacts();
				   			$rootScope.showList();
			   			}
			   			else {
			   				$rootScope.message = "Try Again";
			   			}
				   	})
				   	.error(function(error){
				   		console.log(error)
				   	});
			   	} else {
			   		$http.post('/updateContact',{contactdata : $rootScope.contactdata})
				   	.success(function(data){
				   		if (data){
			   				$rootScope.message = data.message;
			   				$rootScope.showList();
		   				}
			   			else {
			   				$rootScope.message = "Try Again";
			   			}
				   	})
				   	.error(function(error){
				   		console.log(error)
				   	});
			   	}
			//}
			
			
		}

		$rootScope.submitContactEdit = function(form, index){
			//$rootScope.contact_form_submited = false;
		   	//if(form.$valid){
		   		var contact_id;
		   		for(var x=0; x<$rootScope.openedTabs.length; x++){
					if(x == index){
						contact_id = $rootScope.openedTabs[x];
					}
				}
		   		$rootScope.contactdata = {
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
			   		prospective_client:$rootScope.prospective_client.status
			   	};
			   	if(contact_id == 'new'){
			   		$http.post('/createContact',{contactdata : $rootScope.contactdata, weblogin:$rootScope.weblogin})
				   	.success(function(data){
				   		if (data){
				   			$rootScope.message = data.message;
				   			$rootScope.getContacts();
				   			$rootScope.showList();
				   			setTimeout(function(){
				   				$rootScope.message = "";
				   				$rootScope.$apply();
				   			},5000);
			   			}
			   			else {
			   				$rootScope.message = "Try Again";
			   			}
				   	})
				   	.error(function(error){
				   		console.log(error)
				   	});
			   	} else {
			   		$http.post('/updateContact',{contactdata : $rootScope.contactdata,weblogin:$rootScope.weblogin})
				   	.success(function(data){
				   		if (data){
			   				$rootScope.message = data.message;
			   				setTimeout(function(){
				   				$rootScope.message = "";
				   				$rootScope.$apply();
				   			},5000);
		   				}
			   			else {
			   				$rootScope.message = "Try Again";
			   			}
				   	})
				   	.error(function(error){
				   		console.log(error)
				   	});
			   	}
			//}
		}


		$rootScope.expandPhone = function() {
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

	   $rootScope.expandAddress = function() {
	   	$rootScope.addreses.push({
	   		
	   	});
	   }

	   $rootScope.expandEmail = function() {
	   	$rootScope.emails.push("");
	   }

	   $rootScope.expandrefferedby = function() {
	   	$rootScope.refferedbys.push("");
	   }

	   $rootScope.expandNote = function() {
	   	$rootScope.notes.push("");
	   }

	   $rootScope.addContactAitionalFields = function(key){
	   	$rootScope.additionalfields.push({key:key,value:""});
	   }

	   $rootScope.setEditMode = function(mode){
	   	$rootScope.isEditContact = mode;
	   }

		$rootScope.showtab = function(index, isNew){
			$rootScope.formEditMode = true;
			$rootScope.createMode = false;

			$(".active").removeClass("active");
			setTimeout(function(){
				$("#tab"+index).addClass('active');
			},  100);
			
			
			if(!isNew && isNew !='undefined' && $rootScope.openedTabs[index] != "new") {
				$rootScope.isEditForm = true;
				$rootScope.isEditContact = false;
				$rootScope.isMatterShowTab = true;
			}
			else {
				$rootScope.isEditContact = true;
				$rootScope.isEditForm = true;
				$rootScope.isMatterShowTab = false;
			}
			$rootScope.displayedContactId = $rootScope.openedTabs[index];
			$rootScope.editFormIndex = index;
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
	   		$rootScope.prospective_client.status = $rootScope.tabs[index].contact.prospective_client;
	   		if($rootScope.tabs[index].contact.clientweblogin){
	   			$rootScope.weblogin._id = $rootScope.tabs[index].contact.clientweblogin._id;
	   			$rootScope.weblogin.email = $rootScope.tabs[index].contact.clientweblogin.email;
		       	$rootScope.weblogin.password = $rootScope.tabs[index].contact.clientweblogin.password;
		        $rootScope.weblogin.is_enabled = $rootScope.tabs[index].contact.clientweblogin.is_enabled;
	   		}

	   		angular.forEach($scope.categories, function(val, i){
	   			if(val._id == $rootScope.category_id){
	   				$rootScope.initContactContactCategory(val);
	   			}
	   		});
		}

		$rootScope.newContact = function(){
			//$rootScope.category_id = category_id;
			$rootScope.formEditMode = false;
			$rootScope.createMode = true;
			$rootScope.isEditContact = true;
			var isOpened = false;
			var index = 0;
			for(var x = 0; x<$rootScope.openedTabs.length;x++){
				if($rootScope.openedTabs[x] == 'new'){
					isOpened = true;
					index = x;
				}
			}

			if(isOpened){
				$rootScope.tabs.splice(index, 1);
				$rootScope.tabContent.splice(index, 1);
				$rootScope.openedTabs.splice(index, 1);
			}

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
			
			$rootScope.showtab(index, true);
		}
		
		$rootScope.createNewTab = function(contact){
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
			$rootScope.showtab(index);
		}

		$rootScope.isEditContact = false;

		$rootScope.showList = function(){
			
			$(".active").removeClass("active");
			setTimeout(function(){
				$rootScope.isEditForm = false;
				$rootScope.isEditContact = false;
				$rootScope.$apply();
			},1000);
			setTimeout(function(){
				$("#home").addClass('active');

				$rootScope.formEditMode = false;
				$rootScope.createMode = false;
				$rootScope.isEditForm = false;
				$rootScope.isEditContact = false;

				$rootScope.prospective_client = {status:false};
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
			    $rootScope.weblogin.email = "";
		       	$rootScope.weblogin.password = "";
		        $rootScope.weblogin.is_enabled = false;
			},  200);
		}

		$rootScope.discardContact = function(index){
			$rootScope.tabs.splice(index, 1);
			$rootScope.tabContent.splice(index, 1);
			$rootScope.openedTabs.splice(index, 1);
			$rootScope.showList();
		}

		$rootScope.deleteContact = function(index){

	  		var id = $rootScope.openedTabs[index];
	  		if($rootScope.openedTabs[index])
	  			$http.post('/deleteContact',{id:id})
	  			.success(function(data){
	  				if(data.success){
				   		$rootScope.showList();
				   		angular.forEach($rootScope.allContactes, function(val,i){
				   			if(val._id == id){
				   				$rootScope.allContactes.splice(i,1);
				   			}
				   		});
				   		$rootScope.tabs.splice(index, 1);
						$rootScope.tabContent.splice(index, 1);
						$rootScope.openedTabs.splice(index, 1);
	  				} else {
	  					console.log(data);
	  				}
	  			})
	  			.error(function(error){
	  				console.log(error);
	  			});
	    }

		$rootScope.removeAdditionalField = function(index){
			angular.forEach($rootScope.additionalfields, function(val, i){
				if(i==index){
					$rootScope.additionalfields.splice(i,1);
				}
			});
		}

		$rootScope.removeRefferedbys = function(index){
			angular.forEach($rootScope.refferedbys, function(val, i){
				if(i==index){
					$rootScope.refferedbys.splice(i,1);
				}
			});
		}

		$rootScope.removeEmails = function(index){
			angular.forEach($rootScope.emails, function(val, i){
				if(i==index){
					$rootScope.emails.splice(i,1);
				}
			});
		}

		$rootScope.removePhones = function(index){
			angular.forEach($rootScope.phones, function(val, i){
				if(i==index){
					$rootScope.phones.splice(i,1);
				}
			});
		}

		$rootScope.removeAddress = function(index){
			angular.forEach($rootScope.addreses, function(val, i){
				if(i==index){
					$rootScope.addreses.splice(i,1);
				}
			});
		}

		$rootScope.getContact = function(){
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

		$rootScope.addMatterTabFromContact = function(id){
			setTimeout(function(){
				$rootScope.addMatterTab(id);
			},5000);
		}


		$rootScope.formValidater = function(){
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

