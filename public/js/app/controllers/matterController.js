angular.module('myApp.matterController', [])
.controller('matterController', function( $rootScope, $scope, $window, $location,$http) {
	$rootScope.convertTime = function(date){
	    var system_date  = Date.parse(date);;
	    var user_date = new Date();
	    var diff = Math.floor((user_date - system_date) / 1000);
	    if (diff <= 1) {return "just now";}
	    if (diff < 20) {return diff + " seconds ago";}
	    if (diff < 40) {return "half a minute ago";}
	    if (diff < 60) {return "less than a minute ago";}
	    if (diff <= 90) {return "one minute ago";}
	    if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
	    if (diff <= 5400) {return "1 hour ago";}
	    if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
	    if (diff <= 129600) {return "1 day ago";}
	    if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
	    if (diff <= 777600) {return "1 week ago";}
	    return "on " + date.split("T")[0];
	  };

	 $rootScope.getTimeFromDate = function(date){
	 	var system_date  = new Date(date.toLocaleString());
	 	var h = system_date.getHours();
		var m = system_date.getMinutes();
		return h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM");
	 }

	 $rootScope.setMatterType = function(matterType){
	 	$rootScope.currentMatterType = matterType;
	 }

	 $rootScope.matterTabShow = 'listTab';
	 $rootScope.matterTabs = [];
	 $rootScope.openedMatters = [];

	 $rootScope.addMatterTab = function(id){
	 	var matter = {};
		angular.forEach($rootScope.matters, function(val, i){
			if(val._id == id){
				matter = $rootScope.matters[i];
			}
		});
	 	var isOpened = false;
	 	$('#myTab .active').removeClass('active');
	 	angular.forEach($rootScope.matterTabs, function(val, i){
	 		if(val._id == matter._id){
	 			isOpened = true;
	 			val.class = 'active';
	 		} else {
	 			val.class = '';
	 		}
	 	});
	 	if(!isOpened){
	 		$rootScope.matterTabs.push({name:matter.matter.property.matter_name, _id:matter._id, class:'active'});
	 		$rootScope.openedMatters.push(matter);
	 	}

	 	$rootScope.matterForm = matter.matter;
 		$rootScope.partiesForm = matter.parties;

			for (var key in $rootScope.partiesForm) {
				//console.log($rootScope.partiesForm[key]);
				if($.isArray($rootScope.partiesForm[key])){
					var arr = [];
					angular.forEach($rootScope.partiesForm[key], function(val,i){
						arr.push(val._id);
					});
					$rootScope.partiesForm[key] = arr;
				} else {
					$rootScope.partiesForm[key] = $rootScope.partiesForm[key]._id;
				}
			}
 		// angular.forEach($rootScope.partiesForm, function(val, i){
 		// 	console.log(val,i);
 		// 	if($.isArray(val)){
 		// 		angular.forEach($rootScope.partiesForm[i], function(v, x){
 		// 			console.log($rootScope.partiesForm[i])
 		// 		});
 		// 	} else {

 		// 	}


 		// });
 		$rootScope.activity = matter.activity;
 		$rootScope.documents = matter.documents;
 		$rootScope.matter_id = matter._id;
 		$rootScope.matterTabShow = 'matterTab';
	 }

	 $rootScope.showMatterTab = function(index){
	 	$('#myTab .active').removeClass('active');
	 	var matter = $rootScope.openedMatters[index];
	 	angular.forEach($rootScope.matterTabs, function(val, i){
	 		if(val._id == matter._id){
	 			$rootScope.matterTabs[i].class = 'active';
			 	$rootScope.matterForm = matter.matter;
		 		$rootScope.partiesForm = matter.parties;
		 		$rootScope.activity = matter.activity;
		 		$rootScope.documents = matter.documents;
		 		$rootScope.matter_id = matter._id;
		 		$rootScope.matterTabShow = 'matterTab';
	 		} else {
	 			val.class = '';
	 		}
	 	});
	 }

	 $rootScope.discardMatter = function(index){
	 	$rootScope.matterTabs.splice(index, 1);
	 	$rootScope.openedMatters.splice(index,1);
	 	$rootScope.matterTabShow = 'listTab';
	 	$('#myTab #home').addClass('active');
	 }

	 $rootScope.updateMatter = function(){
	 	$http.post('/updateMatter', {
			matter:$rootScope.matterForm,
			parties:$rootScope.partiesForm,
			activity:$rootScope.activity,
			documents:$rootScope.documents,
			matter_id:$rootScope.matter_id
		})
		.success(function(data){
			if(data.success){
				console.log("matter saved");
			} else {
				console.log(data);
			}
		})
		.error(function(error){
			console.log(error);
		});
	 }

	 $rootScope.showMatterList = function(){
	 	$("#myTab .active").removeClass('active');
	 	$rootScope.matterTabShow = 'listTab';
	 	$("#home").addClass('active');
	 }

	 $rootScope.getMatters = function(){
	 	$http.get('/getMatters/'+$rootScope.currentMatterType)
	 	.success(function(data){
	 		if(data.success){
	 			$rootScope.matters = data.matters;
	 			$rootScope.getStartChars();
	 		} else {
	 			console.log(data);
	 		}
	 	})
	 	.error(function(error){
	 		console.log(error);
	 	})
	 }

	 $rootScope.startChars = [];
	 $rootScope.filterChar = '';
	 $rootScope.setFilterChar = function(ch){
	 	$rootScope.filterChar = ch;
	 }
	 $rootScope.getStartChars = function(){
	 	angular.forEach($rootScope.matters, function(val, i){
	 		var ch = val.matter.property.matter_name.charAt(0).toUpperCase();
	 		var isFind = false;
	 		angular.forEach($rootScope.startChars, function(val, i){
	 			if(ch == val)
	 				isFind = true;
	 		});
	 		if(!isFind) $rootScope.startChars.push(ch);
	 	});
	 	$rootScope.startChars.sort();
	 }

	 $rootScope.deleteMatter = function(id){

	 	$http.post('/deleteMatter', {id:id})
	 	.success(function(data){
	 		if(data.success){
	 			angular.forEach($rootScope.matters, function(val, i){
	 				if(val._id == id)
	 					$rootScope.matters.splice(i, 1);
	 			});
	 		}
	 	})
	 	.error(function(error){
	 		console.log(error);
	 	})
	 }

	 $rootScope.searchByChar = function(data){
	 	console.log(data);
	 }

	$rootScope.downloadDocuments = function(){
		var downloadedFiles = [];
		angular.forEach($rootScope.documents, function(val, i){
			if(val.is_checked){
				downloadedFiles.push(val.document);

			}
		});
		if(downloadedFiles.length == 0){
			alert("Please select files to download.");
		} else {
			$http.post('/download/documents', {documents : downloadedFiles})
			.success(function(data){
				if(data.success){
					window.location.href = data.url;
				} else {
					alert("Please try again.");
				}
			});
		}
	}

	 $rootScope.getDateAndTime = function(date){

	 	var system_date  = new Date(date);
	 	var h = system_date.getHours();
		var m = system_date.getMinutes();

		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

		var d = new Date();
		var curr_date = d.getDate();
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();
		
		return (m_names[curr_month]  + " " + curr_date + ", " +  curr_year) + " " + (h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM"));

	 }

	 $rootScope.getFormatedDate = function(date){

	 	var system_date  = new Date(date);
		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		var curr_date = system_date.getDate();
		var curr_month = system_date.getMonth();
		var curr_year = system_date.getFullYear();

		return (curr_date+"-"+m_names[curr_month]+"-"+curr_year);

	 }

	$http.get("/getUniqueNumber")
	.success(function(data){
		$rootScope.uniqueNumber = data.uniqueNumber;
		$rootScope.matterForm.title.unique_number = data.uniqueNumber;
	})
	.error(function(error){
		console.log(error);
	});

	$rootScope.showTab='matter';

	$rootScope.openTab = function(tab){
		$rootScope.showTab = tab;
	}

	$rootScope.matterForm = {
		property : {

			matter_name:"",
			sales_type:"",
			property_type:"",
			house_type:"",
			no_of_floors:0,
			no_of_buyers:1,
			no_of_salers:1,
			has_tenants:false,

			addreses:[{
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
			}]
		},

		finances : {
			price:"",
			finance_type:"",
			no_of_lenders:1,
			mortgage_type:"",
			cash_total_amount:"",
			mortgage_total_amount:"",
			earnest_money:"",
			advance_payment_amount:"",
			mortgage_monthly_amount:"",
			mortgage_b_amount:"",
			mortgage_policy_amount:"",
			mortgage_b_policy_amount:""
		},
		title:{
			unique_number:$rootScope.uniqueNumber,
			patriot:false,
			air_resources:false,
			bankruptcy:false,
			certificate_of_occupancy:false,
			emergency_repair:false,
			fire_department:false,
			oil_burner_permit:false,
			flood_zone:false
		},
		fees_and_taxes:{
			purchase_policy_fee:"",
			purchase_policy_b_fee:"",
			homestead_tax:"",
			loan_origination_fee:"",
			maintenance_fees:""
		},
		notes:[""],
		type:"Open"
	}

	$rootScope.partiesForm = {
		sellers : [""],
		sellers_attorney:[""],
		sellers_agent:[""],
		buyers : [""],
		buyers_attorney:[""],
		buyers_agent:[""],
		lender:null,
		lender_attorney:null,
		lender_agent:null,
		surveyor:null,
		past_inspector:null,
		building_inspector:null,
		additionalfields:[],
		title_company:null,
		title_search:null,
		under_writer:null,
		closer:null
	}

	$rootScope.formData = new FormData();

	$rootScope.activity = [];
	$rootScope.documents = [];

	$rootScope.new_activity = {
		add_to_schedule:false,
		date:new Date(),
		time:new Date(),
		activity:"",
		remark:"",
		user:"Test"
	};

	$rootScope.new_document = {
		name : "",
		document:$rootScope.myFile,
		notes:"",
		user : "test"
	}

	$rootScope.resetActivity = function(){
		$rootScope.new_activity = {
			add_to_schedule:false,
			date:new Date(),
			time:new Date(),
			activity:"",
			remark:"",
			user:"Test"
		};
	}

	$scope.editActivity = function(activity, index){
		$rootScope.new_activity.add_to_schedule = activity.add_to_schedule;
		$rootScope.new_activity.date = activity.date;
		$rootScope.new_activity.time = activity.time;
		$rootScope.new_activity.activity = activity.activity;
		$rootScope.new_activity.remark = activity.remark;
		$rootScope.new_activity.user = activity.user;
		$rootScope.activityEditIndex = index;
	}

	$rootScope.editDocument = function(d,index){
		$rootScope.new_document.name = d.name;
		$rootScope.new_document.notes = d.notes;
		$rootScope.new_document.user = d.user;
		$rootScope.documentEditIndex = index;
	}

	$rootScope.resetDocument = function(){
		$rootScope.new_document = {
			name : "",
			document:"",
			notes:"",
			user : "test"
		}
	}

	$rootScope.saveMatter = function(){
		$http.post('/saveMatter', {
			matter:$rootScope.matterForm,
			parties:$rootScope.partiesForm,
			activity:$rootScope.activity,
			documents:$rootScope.documents
		})
		.success(function(data){
			if(data.success){
				console.log("matter saved");
				$rootScope.matter_form_submited = false;
				$rootScope.parties_form_submiter = false;
			} else {
				console.log(data);
			}
			$rootScope.getMatters();
		})
		.error(function(error){
			console.log(error);
		});
	}

	$rootScope.getContacts = function(){
	    $http.get('/getContacts')
	    .success(function(data){
	    	if (data.success) {
    			$rootScope.contactes = data.contactes;
    		}
	    })
	    .error(function(error){
	    	console.log(error);
	    });
	}


	$scope.items=["item1","item2","item3"],


	$scope.open = function(templateUrl,index,type) {
		if (type== "phonetype"){
			$rootScope.phonepop = $rootScope.phones[index];
		};
		if (type == "addresstype") {
				$rootScope.addresspop = $rootScope.matterForm.property.addreses[index];
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
    )};


	$rootScope.partiesFormSubmit = function(form){
		//$rootScope.parties_form_submiter = true;
		//if(form.$valid){
			$rootScope.openTab('activity');
		//}
	}

	$rootScope.addAitionalFiel = function(key){
   		$rootScope.partiesForm.additionalfields.push({key:key,value:""});
    }

    $rootScope.addAddress = function(){
    	$rootScope.matterForm.property.addreses.push({});
    }

    $scope.removeAddress = function(index){
		$rootScope.matterForm.property.addreses.splice(index,1);
	}

    $rootScope.removeAdditionalField = function(index){
		$rootScope.partiesForm.additionalfields.splice(index,1);
	}

	$rootScope.matterFormSubmit = function(form){
		//$rootScope.matter_form_submited = true;
		//if(form.$valid){
			$rootScope.openTab('parties');
		//}
	}

	$rootScope.addSeller = function(){
		$rootScope.partiesForm.sellers.push("");
		$rootScope.matterForm.property.no_of_salers = $rootScope.partiesForm.sellers.length;
	}

	$rootScope.addBuyers = function(){
		$rootScope.partiesForm.buyers.push("");
		$rootScope.matterForm.property.no_of_buyers = $rootScope.partiesForm.buyers.length;
	}

	$rootScope.removeSeller = function(index){
		$rootScope.partiesForm.sellers.splice(index, 1);
		$rootScope.matterForm.property.no_of_salers = $rootScope.partiesForm.sellers.length;
	}

	$rootScope.removeBuyer = function(index){
		$rootScope.partiesForm.buyers.splice(index, 1);
		$rootScope.matterForm.property.no_of_buyers = $rootScope.partiesForm.buyers.length;
	}

	$rootScope.setSellersLength = function(){
		$rootScope.partiesForm.sellers = [];
		for(var x = 0; x < $rootScope.matterForm.property.no_of_salers; x++){
			$rootScope.partiesForm.sellers.push("");
		}
	}

	$rootScope.setBuyersLength = function(){
		$rootScope.partiesForm.buyers = [];
		for(var x = 0; x < $rootScope.matterForm.property.no_of_buyers; x++){
			$rootScope.partiesForm.buyers.push("");
		}
		console.log($rootScope.partiesForm.buyers);
	}

	$rootScope.addSellerAgent = function(){
		$rootScope.partiesForm.sellers_agent.push("");
	}

	$rootScope.addSellerAttorney = function(){
		$rootScope.partiesForm.sellers_attorney.push("");
	}

	$rootScope.removeSellerAgent = function(index){
		$rootScope.partiesForm.sellers_agent.splice(index,1);
	}

	$rootScope.removeSellerAttorney = function(index){
		$rootScope.partiesForm.sellers_attorney.splice(index,1);
	}

	$rootScope.addBuyersAgent = function(){
		$rootScope.partiesForm.buyers_agent.push("");
	}

	$rootScope.addBuyersAttorney = function(){
		$rootScope.partiesForm.buyers_attorney.push("");
	}

	$rootScope.removeBuyersAgent = function(index){
		$rootScope.partiesForm.buyers_agent.splice(index,1);
	}

	$rootScope.removeBuyersAttorney = function(index){
		$rootScope.partiesForm.buyers_attorney.splice(index,1);
	}

	$rootScope.getAttornies = function(){
		$http.post('/getContact',{category_id : 3})
	    .success(function(data){
	    	if (data) {
	    			$rootScope.attorneys = data.data;
	    		}
	    })
	    .error(function(error){
	    	console.log(error);
	    });
	}

	$scope.newMatter = function(){
		$scope.isNewMatter = true;
		$(".matterslist").removeClass("active");
		setTimeout(function(){
			$(".newmatter a").click();
		},100);
	}

	$scope.removeExtrasTag = function(){
		if($(".matterslist a:first").attr("href") == "#"){
			$(".matterslist a:first").remove();
		}
	}

	$scope.discardNewMatter = function(){
		$scope.isNewMatter = false;
		$(".newmatter").removeClass("active");
		setTimeout(function(){
			$(".matterslist a").click();
		},100);
	}

	$scope.clearMatterForm = function(){
		$rootScope.matterForm = {
			property : {
				matter_name:"",
				sales_type:"",
				property_type:"",
				house_type:"",
				no_of_floors:0,
				no_of_buyers:1,
				no_of_salers:1,
				has_tenants:false,

				addreses:[{
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
				}]
			},

			finances : {
				price:"",
				finance_type:"",
				no_of_lenders:1,
				mortgage_type:"",
				cash_total_amount:"",
				mortgage_total_amount:"",
				earnest_money:"",
				advance_payment_amount:"",
				mortgage_monthly_amount:"",
				mortgage_b_amount:"",
				mortgage_policy_amount:"",
				mortgage_b_policy_amount:""
			},
			title:{
				unique_number:$rootScope.uniqueNumber,
				patriot:false,
				air_resources:false,
				bankruptcy:false,
				certificate_of_occupancy:false,
				emergency_repair:false,
				fire_department:false,
				oil_burner_permit:false,
				flood_zone:false
			},
			fees_and_taxes:{
				purchase_policy_fee:"",
				purchase_policy_b_fee:"",
				homestead_tax:"",
				loan_origination_fee:"",
				maintenance_fees:""
			},
			notes:[""],
			type:"Open"
		}

		$rootScope.partiesForm = {
			sellers : [""],
			sellers_attorney:[""],
			sellers_agent:[""],
			buyers : [""],
			buyers_attorney:[""],
			buyers_agent:[""],
			lender:null,
			lender_attorney:null,
			lender_agent:null,
			surveyor:null,
			past_inspector:null,
			building_inspector:null,
			additionalfields:[],
			title_company:null,
			title_search:null,
			under_writer:null,
			closer:null
		}

		$rootScope.formData = new FormData();

		$rootScope.activity = [];

		$rootScope.documents = [];

		$rootScope.new_activity = {
			add_to_schedule:false,
			date:new Date(),
			time:new Date(),
			activity:"",
			remark:"",
			user:"Test"
		};

		$rootScope.new_document = {
			name : "",
			document:$rootScope.myFile,
			notes:"",
			user : "test"
		}

	}
});