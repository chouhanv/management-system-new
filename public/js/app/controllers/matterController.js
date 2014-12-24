angular.module('myApp.matterController', [])
.controller('matterController', function( $scope, $rootScope, $window, $location,$http) {
	$scope.convertTime = function(date){
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

	 $scope.getTimeFromDate = function(date){
	 	var system_date  = new Date(date.toLocaleString());
	 	var h = system_date.getHours();
		var m = system_date.getMinutes();
		return h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM");
	 }

	 $scope.setMatterType = function(matterType){
	 	$scope.currentMatterType = matterType;
	 }

	 $scope.matterTabShow = 'listTab';
	 $scope.matterTabs = [];
	 $scope.openedMatters = [];

	 $scope.addMatterTab = function(id){
	 	var matter = {};
		angular.forEach($scope.matters, function(val, i){
			if(val._id == id){
				matter = $scope.matters[i];
			}
		});
	 	var isOpened = false;
	 	$('#myTab .active').removeClass('active');
	 	angular.forEach($scope.matterTabs, function(val, i){
	 		if(val._id == matter._id){
	 			isOpened = true;
	 			val.class = 'active';
	 		} else {
	 			val.class = '';
	 		}
	 	});
	 	if(!isOpened){
	 		$scope.matterTabs.push({name:matter.matter.property.matter_name, _id:matter._id, class:'active'});
	 		$scope.openedMatters.push(matter);
	 	}

	 	$scope.matterForm = matter.matter;
 		$scope.partiesForm = matter.parties;

		for (var key in $scope.partiesForm) {
			//console.log($scope.partiesForm[key]);
			if($.isArray($scope.partiesForm[key])){
				var arr = [];
				angular.forEach($scope.partiesForm[key], function(val,i){
					if(val && val._id)
						arr.push(val._id);
					else
						arr.push(null);
				});
				$scope.partiesForm[key] = arr;
			} else {
				if($scope.partiesForm[key] && $scope.partiesForm[key]._id)
					$scope.partiesForm[key] = $scope.partiesForm[key]._id;
				else
					$scope.partiesForm[key] = null;
			}
		}
 		$scope.activity = matter.activity;
 		$scope.documents = matter.documents;
 		$scope.matter_id = matter._id;
 		$scope.matterTabShow = 'matterTab';
 		
 		$(".matterslist").removeClass("active");
 		$(".newmatter").removeClass("active");
		setTimeout(function(){
			$(".matter"+id).addClass('active');
			$("#matterTab"+id).find("a").get(0).click();
		},100);
	 }

	 $scope.showMatterTab = function(index){
	 	$scope.showTab='matter';
	 	$('#myTab .active').removeClass('active');
	 	$("#newMatter").removeClass('active');
	 	$("#matterslist").removeClass("active");
	 	$("#viewmatter").addClass('active');
	 	var matter = $scope.openedMatters[index];
	 	angular.forEach($scope.matterTabs, function(val, i){
	 		if(val._id == matter._id){
	 			$scope.matterTabs[i].class = 'active';
			 	$scope.matterForm = matter.matter;
		 		$scope.partiesForm = matter.parties;
		 		$scope.activity = matter.activity;
		 		$scope.documents = matter.documents;
		 		$scope.matter_id = matter._id;
		 		$scope.matterTabShow = 'matterTab';
	 		} else {
	 			val.class = '';
	 		}
	 	});
	 }

	 $scope.discardMatter = function(index){
	 	$scope.matterTabs.splice(index, 1);
	 	$scope.openedMatters.splice(index,1);
	 	$scope.matterTabShow = 'listTab';
	 	$('#myTab #home').addClass('active');
	 }

	 $scope.updateMatter = function(){
	 	$scope.matterUpdateMessage = "Saving Matter.";
	 	$http.post('/updateMatter', {
			matter:$scope.matterForm,
			parties:$scope.partiesForm,
			activity:$scope.activity,
			documents:$scope.documents,
			matter_id:$scope.matter_id
		})
		.success(function(data){
			if(data.success){
				$scope.matterUpdateMessage = "Matter Successfully Saved.";
				setTimeout(function(){
					$(".matterslist a").click();
				},1000);
			} else {
				console.log(data);
				$scope.matterUpdateMessage = "Please Try Again.";
			}
		})
		.error(function(error){
			console.log(error);
		});
	 }

	 $scope.showMatterList = function(){
	 	$scope.matterUpdateMessage = "";
	 	$("#myTab .active").removeClass('active');
	 	$scope.matterTabShow = 'listTab';
	 	$("#home").addClass('active');
	 }

	 $scope.getMatters = function(){
	 	$http.get('/getMatters/'+$scope.currentMatterType)
	 	.success(function(data){
	 		if(data.success){
	 			$scope.matters = data.matters;
	 			$scope.getStartChars();
	 		} else {
	 			console.log(data);
	 		}
	 	})
	 	.error(function(error){
	 		console.log(error);
	 	})
	 }

	 $scope.startChars = [];
	 $scope.filterChar = '';
	 $scope.setFilterChar = function(ch){
	 	$scope.filterChar = ch;
	 }
	 $scope.getStartChars = function(){
	 	angular.forEach($scope.matters, function(val, i){
	 		var ch = val.matter.property.matter_name.charAt(0).toUpperCase();
	 		var isFind = false;
	 		angular.forEach($scope.startChars, function(val, i){
	 			if(ch == val)
	 				isFind = true;
	 		});
	 		if(!isFind) $scope.startChars.push(ch);
	 	});
	 	$scope.startChars.sort();
	 }

	 $scope.deleteMatter = function(id){

	 	$http.post('/deleteMatter', {id:id})
	 	.success(function(data){
	 		if(data.success){
	 			angular.forEach($scope.matters, function(val, i){
	 				if(val._id == id)
	 					$scope.matters.splice(i, 1);
	 			});
	 		}
	 	})
	 	.error(function(error){
	 		console.log(error);
	 	})
	 }

	 $scope.searchByChar = function(data){
	 	console.log(data);
	 }

	$scope.downloadDocuments = function(){
		var downloadedFiles = [];
		angular.forEach($scope.documents, function(val, i){
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

	 $scope.getDateAndTime = function(date){

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

	 $scope.getFormatedDate = function(date){

	 	var system_date  = new Date(date);
		var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
		var curr_date = system_date.getDate();
		var curr_month = system_date.getMonth();
		var curr_year = system_date.getFullYear();

		return (curr_date+"-"+m_names[curr_month]+"-"+curr_year);

	 }

	$http.get("/getUniqueNumber")
	.success(function(data){
		$scope.uniqueNumber = data.uniqueNumber;
		$scope.matterForm.title.unique_number = data.uniqueNumber;
	})
	.error(function(error){
		console.log(error);
	});

	$scope.showTab='matter';

	$scope.openTab = function(tab){
		$scope.showTab = tab;
	}

	$scope.matterForm = {
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
			unique_number:$scope.uniqueNumber,
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

	$scope.partiesForm = {
		sellers : [null],
		sellers_attorney:[null],
		sellers_agent:[null],
		buyers : [null],
		buyers_attorney:[null],
		buyers_agent:[null],
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

	$scope.formData = new FormData();

	$scope.activity = [];
	$scope.documents = [];

	$scope.new_activity = {
		add_to_schedule:false,
		date:new Date(),
		time:new Date().getTime(),
		activity:"",
		remark:"ccc",
		user:"Test"
	};

	$scope.new_document = {
		name : "",
		document:$scope.myFile,
		notes:"",
		user : "test"
	}

	$scope.saveActivity = function(isMatterExist){
		$scope.activity.push($scope.new_activity);
		$scope.resetActivity();
		if(isMatterExist){
			$scope.updateMatter();
		}
	}

	$scope.resetActivity = function(){
		$scope.new_activity = {
			add_to_schedule:false,
			date:new Date(),
			time:new Date(),
			activity:"",
			remark:"",
			user:"Test"
		};
		console.log($scope.new_activity);

	}

	$scope.editActivity = function(activity, index){
		$scope.new_activity.add_to_schedule = activity.add_to_schedule;
		$scope.new_activity.date = activity.date;
		$scope.new_activity.time = activity.time;
		$scope.new_activity.activity = activity.activity;
		$scope.new_activity.remark = activity.remark;
		$scope.new_activity.user = activity.user;
		$scope.activityEditIndex = index;
	}

	$scope.editDocument = function(d,index){
		$scope.new_document.name = d.name;
		$scope.new_document.notes = d.notes;
		$scope.new_document.user = d.user;
		$scope.documentEditIndex = index;
	}

	$scope.resetDocument = function(){
		$scope.new_document = {
			name : "",
			document:"",
			notes:"",
			user : "test"
		}
	}

	$scope.saveMatter = function(){
		$http.post('/saveMatter', {
			matter:$scope.matterForm,
			parties:$scope.partiesForm,
			activity:$scope.activity,
			documents:$scope.documents
		})
		.success(function(data){
			
			if(data.success){
				$scope.matterUpdateMessage = "Matter Successfully Saved.";
				$scope.matter_form_submited = false;
				$scope.parties_form_submiter = false;
				setTimeout(function(){
					$(".matterslist a").click();
				},1000);
			} else {
				$scope.matterUpdateMessage = "Please Try Again.";
			}
			$scope.getMatters();
		})
		.error(function(error){
			console.log(error);
		});
	}

	$scope.getContacts = function(){
	    $http.get('/getContacts')
	    .success(function(data){
	    	if (data.success) {
    			$scope.contactes = data.contactes;
    		}
	    })
	    .error(function(error){
	    	console.log(error);
	    });
	}


	// $scope.items=["item1","item2","item3"],


	// $scope.open = function(templateUrl,index,type) {
	// 	if (type== "phonetype"){
	// 		$scope.phonepop = $scope.phones[index];
	// 	};
	// 	if (type == "addresstype") {
	// 			$scope.addresspop = $scope.matterForm.property.addreses[index];
	// 		};
	// 	var modalInstance;
	// 	modalInstance=$modal.open({
	// 		templateUrl:templateUrl, controller:"ModalInstanceCtrl", 
	// 		resolve:{
	// 			items:function(){
	// 				return $scope.items
	// 			}
	// 		}
	// 	}), modalInstance.result.then(function(selectedItem){
	// 		$scope.selected=selectedItem
	// 	}, function(){
 //        		//$log.info("Modal dismissed at: "+new Date)
 //        }
 //    )};


	$scope.partiesFormSubmit = function(form){
		//$scope.parties_form_submiter = true;
		//if(form.$valid){
			$scope.openTab('activity');
		//}
	}

	$scope.addAitionalFiel = function(key){
   		$scope.partiesForm.additionalfields.push({key:key,value:""});
    }

    $scope.addAddress = function(){
    	$scope.matterForm.property.addreses.push({});
    }

    $scope.removeAddress = function(index){
		$scope.matterForm.property.addreses.splice(index,1);
	}

    $scope.removeAdditionalField = function(index){
		$scope.partiesForm.additionalfields.splice(index,1);
	}

	$scope.matterFormSubmit = function(form){
		//$scope.matter_form_submited = true;
		//if(form.$valid){
			$scope.openTab('parties');
		//}
	}

	$scope.addSeller = function(){
		$scope.partiesForm.sellers.push(null);
		$scope.matterForm.property.no_of_salers = $scope.partiesForm.sellers.length;
	}

	$scope.addBuyers = function(){
		$scope.partiesForm.buyers.push(null);
		$scope.matterForm.property.no_of_buyers = $scope.partiesForm.buyers.length;
	}

	$scope.removeSeller = function(index){
		$scope.partiesForm.sellers.splice(index, 1);
		$scope.matterForm.property.no_of_salers = $scope.partiesForm.sellers.length;
	}

	$scope.removeBuyer = function(index){
		$scope.partiesForm.buyers.splice(index, 1);
		$scope.matterForm.property.no_of_buyers = $scope.partiesForm.buyers.length;
	}

	$scope.setSellersLength = function(){
		$scope.partiesForm.sellers = [];
		for(var x = 0; x < $scope.matterForm.property.no_of_salers; x++){
			$scope.partiesForm.sellers.push(null);
		}
	}

	$scope.setBuyersLength = function(){
		$scope.partiesForm.buyers = [];
		for(var x = 0; x < $scope.matterForm.property.no_of_buyers; x++){
			$scope.partiesForm.buyers.push(null);
		}
		console.log($scope.partiesForm.buyers);
	}

	$scope.addSellerAgent = function(){
		$scope.partiesForm.sellers_agent.push(null);
	}

	$scope.addSellerAttorney = function(){
		$scope.partiesForm.sellers_attorney.push(null);
	}

	$scope.removeSellerAgent = function(index){
		$scope.partiesForm.sellers_agent.splice(index,1);
	}

	$scope.removeSellerAttorney = function(index){
		$scope.partiesForm.sellers_attorney.splice(index,1);
	}

	$scope.addBuyersAgent = function(){
		$scope.partiesForm.buyers_agent.push(null);
	}

	$scope.addBuyersAttorney = function(){
		$scope.partiesForm.buyers_attorney.push(null);
	}

	$scope.removeBuyersAgent = function(index){
		$scope.partiesForm.buyers_agent.splice(index,1);
	}

	$scope.removeBuyersAttorney = function(index){
		$scope.partiesForm.buyers_attorney.splice(index,1);
	}

	$scope.getAttornies = function(){
		$http.post('/getContact',{category_id : 3})
	    .success(function(data){
	    	if (data) {
	    			$scope.attorneys = data.data;
	    		}
	    })
	    .error(function(error){
	    	console.log(error);
	    });
	}

	$scope.newMatter = function(){
		$scope.isNewMatter = true;
		$scope.clearMatterForm();
		$scope.showTab='matter';
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
		$scope.matterForm = {
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
				unique_number:$scope.uniqueNumber,
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

		$scope.partiesForm = {
			sellers : [null],
			sellers_attorney:[null],
			sellers_agent:[null],
			buyers : [null],
			buyers_attorney:[null],
			buyers_agent:[null],
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

		$scope.formData = new FormData();

		$scope.activity = [];

		$scope.documents = [];

		$scope.new_activity = {
			add_to_schedule:false,
			date:new Date(),
			time:new Date(),
			activity:"",
			remark:"ccc",
			user:"Test"
		};


		$scope.new_document = {
			name : "",
			document:$scope.myFile,
			notes:"",
			user : "test"
		}

	}
});