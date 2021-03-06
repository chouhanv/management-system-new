'use strict';

/* Controllers */

angular.module('myApp.contactController', [])
.controller('contactController', function( $scope, $rootScope, $window, $location,$http, fileReader, notificationMessage) {

	$rootScope.filterBy = "";
	$rootScope.setFilterBy = function(filterBy, id){
		$rootScope.filterBy = filterBy;
		$rootScope.filterByCatId = id;
		$rootScope.allContactes = [];
		$rootScope.startIndex = 0;
		$rootScope.currentPage = 0;
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
			middlename:"",
			lastname:"",
			suffix:"",
			initial:"",
			maiden:"",
			lettersalutation:"",
			letterclosing:"",
			sortname:"",
			phoneticfirstname:"",
			phoneticlastname:"",
		};
		$rootScope.phones = [{
			         phonetype : "workphone",
			         number  : "",
			         extension: "",
		}, {
			         phonetype : "homephone",
			         number  : "",
			         extension: "",
		}, {
			         phonetype : "cellphone",
			         number  : "",
			         extension: "",
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
			   		prospective_client : $rootScope.prospective_client.status,
			   		assistantname : $rootScope.assistantname,
			   		accountname : $rootScope.accountname
			   	};
			   	$http.post('/createContact',{contactdata : $rootScope.contactdata})
			   	.success(function(data){
			   		if (data){
			   			//$rootScope.message = data.message;
			   			$rootScope.getContacts();
			   			$rootScope.getTotalContacts();
			   			notificationMessage.show(data.message);
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
			$rootScope.filterBy = category.categorie;
		}

		$rootScope.submitContact = function(form, index){
			$rootScope.contact_form_submited = true;
		    	if(form.$valid){
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
			   		prospective_client:$rootScope.prospective_client.status,
			   		assistantname : $rootScope.assistantname,
			   		accountname : $rootScope.accountname
			   	};
			   	if(contact_id == 'new'){
			   		$http.post('/createContact',{contactdata : $rootScope.contactdata})
				   	.success(function(data){
				   		if (data){
				   			//$rootScope.message = data.message;
				   			notificationMessage.show(data.message);
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
			   				notificationMessage.show(data.message);
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
			} else {
				console.log(from);
			}
		}

		$rootScope.submitContactEdit = function(form, index){
			console.log("fsdfdsf");
			$rootScope.contact_form_submited = false;
		   	if(form.$valid){
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
			   		prospective_client:$rootScope.prospective_client.status,
			   		assistantname : $rootScope.assistantname,
			   		accountname : $rootScope.accountname
			   	};
			   	if(contact_id == 'new'){
			   		$http.post('/createContact',{contactdata : $rootScope.contactdata, weblogin:$rootScope.weblogin})
				   	.success(function(data){
				   		if (data){
				   			//$rootScope.message = data.message;
				   			$rootScope.getContacts();
				   			$rootScope.showList();
				   			notificationMessage.show(data.message);
				   			$rootScope.discardContact($rootScope.editFormIndex);
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
			   				notificationMessage.show(data.message);
		   				}
			   			else {
			   				$rootScope.message = "Try Again";
			   			}
				   	})
				   	.error(function(error){
				   		console.log(error)
				   	});
			   	}
			} else {
				console.log(form);
			}
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

	   $rootScope.expandAddress = function(type) {
	   	$rootScope.addreses.push({
					      addressline1 : "",
					      city         : "",
					      state        : "",
					      zip          : "",
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
					      neighborhood        : "",
					      addresstype : type
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
	   	//$rootScope.additionalfields.push({key:key,value:""});
	   	//console.log($rootScope.additionalfields);
	   	if(
	   		key == "Social Security Number"
	   		||
	   		key == "Children"
	   		||
	   		key == "Mother Name"
	   		||
	   		key == "Languages"
	   		||
	   		key == "Keywords/Tags"
	   		){

	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields : [
	   				{label:key, value:"", type:"text", name:key.toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});

	   	} else if(
	   		key == "FedEx Account Number"
	   		) {
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields : [
	   				{label:key, value:"", type:"number", name:key.toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(
	   		key == "Skype"
	   		||
	   		key == "Google+"
	   		||
	   		key == "Facebook"
	   		||
	   		key == "Twitter"
	   		||
	   		key == "LinkedIn"
	   		||
	   		key == "Website"
	   		) {
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields : [
	   				{label:key, value:"", type:"url", name:key.toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(key == "Date of Birth"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields : [
	   				{label:key, value:"", name:key.toLowerCase().replace(/\s/g, ''), type:"date", regexp:""}
	   			]
	   		});
	   	} else if(key == "Gender") {
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields : [
	   				{label:"Male", type:"radio", value : "Male", name:key.toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Femal", type:"radio", value:"Femal", name:key.toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(key == "Marital Status"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields : [
	   				{label:"Married", type:"radio", value : "Married", name:key.toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Unmarried", type:"radio", value:"Unmarried", name:key.toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(key == "Spouse Name"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields:[
	   				{label:"Spouse First Name", value:"", type:"text", name:("Spouse First Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Spouse Last Name", value:"", type:"text", name:("Spouse First Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Spouse Middle Name", value:"", type:"text", name:("Spouse Middle Name").toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(key == "Bank"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields:[
	   				{label:"Bank Name", value:"", type:"text", name:("Bank Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Bank Account Number", value:"", type:"text", name:("Bank Account Number").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Bank Routing Number", value:"", type:"text", name:("Bank Routing Number").toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(key == "Contact Person"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields:[
	   				{label:"Contact Name", value:"", type:"text", name:("Contact Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Cell", value:"", type:"text", name:("Contact Cell").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Work Phone", value:"", type:"text", name:("Contact Work Phone").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Work Phone Extension", value:"", type:"text", name:("Contact Work Phone Extension").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Email", value:"", type:"email", name:("Contact Work Phone").toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if(key == "IOLA Escrow Account"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields:[
	   				{label:"IOLA Bank Name", value:"", type:"text", name:("IOLA Bank Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"IOLA Bank Account Number", value:"", type:"text", name:("IOLA Bank Account Number").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"IOLA Bank Routing Number", value:"", type:"text", name:("IOLA Bank Routing Number").toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if("Assistant 2"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields:[
	   				{label:"Assistant Name", value:"", type:"text", name:("Assistant Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Assistant Cell", value:"", type:"text", name:("Assistant Cell").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Assistant Work Phone", value:"", type:"text", name:("Assistant Work Phone").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Assistant Work Phone Extension", value:"", type:"text", name:("Assistant Work Phone Extension").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Assistant Email", value:"", type:"text", name:("Assistant Email").toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	} else if("Contact Person"){
	   		$rootScope.additionalfields.push({
	   			key:key,
	   			fields:[
	   				{label:"Contact Person Name", value:"", type:"text", name:("Assistant Name").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Person Cell", value:"", type:"text", name:("Assistant Cell").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Person Work Phone", value:"", type:"text", name:("Assistant Work Phone").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Person Work Phone Extension", value:"", type:"text", name:("Assistant Work Phone Extension").toLowerCase().replace(/\s/g, ''), regexp:""},
	   				{label:"Contact Person Email", value:"", type:"text", name:("Assistant Email").toLowerCase().replace(/\s/g, ''), regexp:""}
	   			]
	   		});
	   	}
	   }

	   $rootScope.setEditMode = function(mode){
	   	$rootScope.isEditContact = mode;
	   }

		$rootScope.showtab = function(index, isNew){
			$rootScope.formEditMode = true;
			$rootScope.createMode = false;
			$scope.contactIndex = index;

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
	   		$rootScope.refferedbys = $rootScope.tabs[index].contact.refferedbys && $rootScope.tabs[index].contact.refferedbys.length>0?$rootScope.tabs[index].contact.refferedbys:[""];
	   		$rootScope.notes = $rootScope.tabs[index].contact.notes && $rootScope.tabs[index].contact.notes.length>0?$rootScope.tabs[index].contact.notes:[""];
	   		console.log($rootScope.notes,$rootScope.refferedbys);
	   		$rootScope.additionalfields = $rootScope.tabs[index].contact.additionalfields;
	   		$rootScope.imageSrc = $rootScope.tabs[index].contact.imageSrc;
	   		$rootScope.prospective_client.status = $rootScope.tabs[index].contact.prospective_client;
	   		if($rootScope.tabs[index].contact.clientweblogin){
	   			$rootScope.weblogin._id = $rootScope.tabs[index].contact.clientweblogin._id;
	   			$rootScope.weblogin.email = $rootScope.tabs[index].contact.clientweblogin.email;
		       	$rootScope.weblogin.password = $rootScope.tabs[index].contact.clientweblogin.password;
		        $rootScope.weblogin.is_enabled = $rootScope.tabs[index].contact.clientweblogin.is_enabled;
	   		}
	   		$rootScope.assistantname = $rootScope.tabs[index].contact.assistantname;
	   		$rootScope.accountname = $rootScope.tabs[index].contact.accountname;
	   		angular.forEach($scope.categories, function(val, i){
	   			if(val._id == $rootScope.category_id){
	   				$rootScope.initContactContactCategory(val);
	   			}
	   		});
	   		$rootScope.changePath('/contacts/'+$rootScope.category.categorie.toLowerCase().replace(/\s/g, ''));
	   		$(".nav-tabs li")[index].click();
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
					      city         : "",
					      state        : "",
					      zip          : "",
					      zipcodelast4  : "",
					      streetname   : "",
					      streetsuffix : "",
					      unittype : "",
					      unitnumber   : "",
					      buildingnumber  : "",
					      streetnameaka    : "",
					      delivertinstructor : "",
					      housenumber : "",
					      addresstype : "homeaddress"
					    }],
				    name : {
				      prefix:"",
				      firstname:"",
				      middlename:"",
				      suffix:"",
				      initial:"",
				      sortname:"",
				      additinalname:"",
				      lettersalutation:"",
				      firmname:"",
				      lastname:""

				    },
				    phones : [{
						         phonetype : "workphone",
						         number  : "",
						         extension: "",
					}, {
						         phonetype : "homephone",
						         number  : "",
						         extension: "",
					}, {
						         phonetype : "cellphone",
						         number  : "",
						         extension: "",
					}, {
						         phonetype : "homefax",
						         number  : "",
						         extension: "",
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
				    imageSrc:"",
				    assistantname : {
				    	firstname : "",
				    	lastname:"",
				    	workphone:"",
				    	extension:"",
				    	cellphone:"",
				    	emails:""
				    },
				    accountname:{
				    	firstname:"",
				    	lastname:""
				    }
				}
			}
			$rootScope.tabs.push(tab);
			$rootScope.tabContent.push({});
			$rootScope.openedTabs.push('new');
			index = $rootScope.openedTabs.length - 1;
			
			$rootScope.showtab(index, true);

			//console.log($rootScope.category);
			//$rootScope.changePath('/contacts/'+$rootScope.category.category.toLowerCase()+".html")
			//$rootScope.changePath('/contacts/'+$rootScope.category.categorie.toLowerCase().replace(/\s/g, ''));

			// if( newName == "client"){
			// 	$rootScope.changePath('/contacts/client');
			// 	console.log("from here");
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "real estate agent"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// } else if(newName == "attorney"){
			// 	$rootScope.changePath('/contacts/attorney');
			// }
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
				var title="";
				title = contact.name.firstname || contact.name.lastname || contact.company.companyname.substring(0,30);
				var tab = {
					title : title,
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
			      addresstype  : "homeaddress",
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
			      middlename:"",
			      suffix:"",
			      initial:"",
			      sortname:"",
			      additinalname:"",
			      lettersalutation:"",
			      lastname:""

			    };
			    $rootScope.phones = [{
					         phonetype : "workphone",
					         number  : "",
					         extension: "",
				}, {
					         phonetype : "homephone",
					         number  : "",
					         extension: "",
				}, {
					         phonetype : "cellphone",
					         number  : "",
					         extension: "",
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

			bootbox.dialog({
				message: "Confirm if you like to delete this contact",
				title: "Custom title",
				buttons: {
					success: {
						label: "Do not delete",
						className: "btn-success",
						callback: function() {
							notificationMessage.show("Delete cancled");
						}
					},
					danger: {
						label: "Delete",
						className: "btn-danger",
						callback: function() {

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
										notificationMessage.show(data.message);
					  				} else {
					  					console.log(data);
					  				}
					  			})
					  			.error(function(error){
					  				console.log(error);
					  			});
						}
					},
				}
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

		$rootScope.removePhone = function(index, type){
			var phoneInd = -1;
			angular.forEach(angular.copy($rootScope.phones), function(val, i){
				if(val.phonetype == type){
					phoneInd++;
					if(phoneInd == index){
						$rootScope.phones.splice(i,1);
					}
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

		// $rootScope.getContact = function(){
		//     $http.post('/getContact',{category_id : $rootScope.category_id})
		//     .success(function(data){
		//     	if (data) {
		//     			$rootScope.getcontactdata = data;
		//     		}
		//     })
		//     .error(function(error){
		//     	console.log(error);
		//     });
		// }

		$rootScope.addMatterTabFromContact = function(id){
			setTimeout(function(){
				$rootScope.addMatterTab(id);
			},5000);
		}


		$rootScope.formValidater = function(){
			$.validator.addMethod(
			        "regex",
			        function(value, element, regexp) {
			            var re = new RegExp(regexp);
			            return this.optional(element) || re.test(value);
			        },
			        "Please enter valid email."
			);

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
                    },
                    city:{
                    	required:true,
                    },
                    state:{
                    	required:true,
                    },
                    zip:{
                    	required:true,
                    }
                }                                        
            });  
		}
});

