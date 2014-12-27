angular.module('myApp.matterController', [])
.controller('matterController', function( $rootScope, $scope, $window, $location,$http, fileUpload) {

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
					if(val && val._id)
						arr.push(val._id);
					else
						arr.push(null);
				});
				$rootScope.partiesForm[key] = arr;
			} else {
				if($rootScope.partiesForm[key] && $rootScope.partiesForm[key]._id)
					$rootScope.partiesForm[key] = $rootScope.partiesForm[key]._id;
				else
					$rootScope.partiesForm[key] = null;
			}
		}
 		$rootScope.activity = matter.activity;
 		$rootScope.documents = matter.documents;
 		$rootScope.matter_id = matter._id;
 		$rootScope.matterTabShow = 'matterTab';
 		$rootScope.selectedActivityToShowRemark = {gdgdf:"gdfgfd"};


 		$rootScope.setSelectedActivityToShowRemark = function(activity){
 			$rootScope.selectedActivityToShowRemark = activity;
 			console.log($rootScope.selectedActivityToShowRemark);
 		}
 		
 		$(".matterslist").removeClass("active");
 		$(".newmatter").removeClass("active");
		setTimeout(function(){
			$(".matter"+id).addClass('active');
			$("#matterTab"+id).find("a").get(0).click();
		},100);
	 }

	 $rootScope.showMatterTab = function(index){
	 	$rootScope.showTab='matter';
	 	$('#myTab .active').removeClass('active');
	 	$("#newMatter").removeClass('active');
	 	$("#matterslist").removeClass("active");
	 	$("#viewmatter").addClass('active');
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
	 	// $rootScope.matterTabShow = 'listTab';
	 	// $('#myTab #home').addClass('active');
	 	setTimeout(function(){
			$(".matterslist a").click();
		},100);
	 }

	 $rootScope.updateMatter = function(isShowList){
	 	console.log(isShowList);
	 	$rootScope.matterUpdateMessage = "Saving Matter.";
	 	$http.post('/updateMatter', {
			matter:$rootScope.matterForm,
			parties:$rootScope.partiesForm,
			activity:$rootScope.activity,
			documents:$rootScope.documents,
			matter_id:$rootScope.matter_id
		})
		.success(function(data){
			if(data.success){
				$rootScope.matterUpdateMessage = "Matter Successfully Saved.";
				setTimeout(function(){
					$rootScope.matterUpdateMessage = "";
				}, 5000);
				setTimeout(function(){
					if(isShowList) $(".matterslist a").click();
				},1000);
			} else {
				console.log(data);
				$rootScope.matterUpdateMessage = "Please Try Again.";
			}
		})
		.error(function(error){
			console.log(error);
		});
	 }

	 $rootScope.showMatterList = function(){
	 	$rootScope.matterUpdateMessage = "";
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
		console.log($rootScope.documents);
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

	$rootScope.formData = new FormData();

	$rootScope.activity = [];
	$rootScope.documents = [];

	$rootScope.new_activity = {
		add_to_schedule:false,
		activity:"",
		remark:"ccc",
		user:"Test"
	};

	$rootScope.new_document = {
		name : "",
		document:$rootScope.myFile,
		notes:"",
		user : "test"
	}

	$rootScope.updateActivity = function(){
		$rootScope.activity_form_submited = false;
		$rootScope.activity.splice($rootScope.activityEditIndex, 1, $scope.new_activity);
		$rootScope.resetActivity();
		$rootScope.updateMatter(false);
	}

	$rootScope.saveActivity = function(isMatterExist){
		$rootScope.activity.push($rootScope.new_activity);
		$rootScope.resetActivity();
		if(isMatterExist){
			$rootScope.updateMatter(false);
		}
	}

	$rootScope.saveDocument = function(isMatterExist){
		var uploadUrl = "/uploadFile";
		$rootScope.fileUploadMessage = "Uploading document...."
		fileUpload.uploadFileToUrl($("#file")[0].files[0], uploadUrl, function(err, path){
			if(err){
				console.log(err);
			} else {
				$rootScope.fileUploadMessage = "Document saved."
				$rootScope.new_document.document  = path;
				$rootScope.documents.push($rootScope.new_document);
				$rootScope.resetDocument();
				$rootScope.document_form_submited = false;
				$rootScope.documentFileRequired = false;
				setTimeout(function(){$("#close-document-model").click();},500);
			}
		});

		if(isMatterExist){
			$rootScope.updateMatter(false);
		}
	}

	$rootScope.resetActivity = function(){
		$rootScope.new_activity = {
			add_to_schedule:false,
			activity:"",
			remark:"",
			user:"Test"
		};

		$("#activity_date").val(null);
		$("#activity_time").val(null);
		$("#activity_schedule").val(false);
		$("#activity_type").val("");
		$("#activity_remark").val("");
		$(".note-editable").html("");

	}

	$rootScope.editActivity = function(activity, index){
		$rootScope.new_activity.add_to_schedule = activity.add_to_schedule;
		$rootScope.new_activity.date = activity.date;
		$rootScope.new_activity.time = activity.time;
		$rootScope.new_activity.activity = activity.activity;
		$rootScope.new_activity.remark = activity.remark;
		$rootScope.new_activity.user = activity.user;
		$rootScope.activityEditIndex = index;

		$("#activity_date").val(activity.date);
		$("#activity_time").val(activity.time);
		$("#activity_schedule").val(activity.add_to_schedule);
		$("#activity_type").val(activity.activity);
		$("#activity_remark").val(activity.remark);
		$(".note-editable").html(activity.remark);


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
				$rootScope.matterUpdateMessage = "Matter Successfully Saved.";
				$rootScope.matter_form_submited = false;
				$rootScope.parties_form_submiter = false;
				setTimeout(function(){
					$(".matterslist a").click();
				},1000);
			} else {
				$rootScope.matterUpdateMessage = "Please Try Again.";
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


	// $rootScope.items=["item1","item2","item3"],


	// $rootScope.open = function(templateUrl,index,type) {
	// 	if (type== "phonetype"){
	// 		$rootScope.phonepop = $rootScope.phones[index];
	// 	};
	// 	if (type == "addresstype") {
	// 			$rootScope.addresspop = $rootScope.matterForm.property.addreses[index];
	// 		};
	// 	var modalInstance;
	// 	modalInstance=$modal.open({
	// 		templateUrl:templateUrl, controller:"ModalInstanceCtrl", 
	// 		resolve:{
	// 			items:function(){
	// 				return $rootScope.items
	// 			}
	// 		}
	// 	}), modalInstance.result.then(function(selectedItem){
	// 		$rootScope.selected=selectedItem
	// 	}, function(){
 //        		//$log.info("Modal dismissed at: "+new Date)
 //        }
 //    )};


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

    $rootScope.removeAddress = function(index){
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
		$rootScope.partiesForm.sellers.push(null);
		$rootScope.matterForm.property.no_of_salers = $rootScope.partiesForm.sellers.length;
	}

	$rootScope.addBuyers = function(){
		$rootScope.partiesForm.buyers.push(null);
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
			$rootScope.partiesForm.sellers.push(null);
		}
	}

	$rootScope.setBuyersLength = function(){
		$rootScope.partiesForm.buyers = [];
		for(var x = 0; x < $rootScope.matterForm.property.no_of_buyers; x++){
			$rootScope.partiesForm.buyers.push(null);
		}
		console.log($rootScope.partiesForm.buyers);
	}

	$rootScope.addSellerAgent = function(){
		$rootScope.partiesForm.sellers_agent.push(null);
	}

	$rootScope.addSellerAttorney = function(){
		$rootScope.partiesForm.sellers_attorney.push(null);
	}

	$rootScope.removeSellerAgent = function(index){
		$rootScope.partiesForm.sellers_agent.splice(index,1);
	}

	$rootScope.removeSellerAttorney = function(index){
		$rootScope.partiesForm.sellers_attorney.splice(index,1);
	}

	$rootScope.addBuyersAgent = function(){
		$rootScope.partiesForm.buyers_agent.push(null);
	}

	$rootScope.addBuyersAttorney = function(){
		$rootScope.partiesForm.buyers_attorney.push(null);
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

	$rootScope.newMatter = function(){
		$rootScope.isNewMatter = true;
		$rootScope.clearMatterForm();
		$rootScope.showTab='matter';
		$(".matterslist").removeClass("active");
		setTimeout(function(){
			$(".newmatter a").click();
		},100);
	}

	$rootScope.removeExtrasTag = function(){
		if($(".matterslist a:first").attr("href") == "#"){
			$(".matterslist a:first").remove();
		}
	}

	$rootScope.discardNewMatter = function(){
		$rootScope.isNewMatter = false;
		$(".newmatter").removeClass("active");
		setTimeout(function(){
			$(".matterslist a").click();
		},100);
	}

	$rootScope.clearMatterForm = function(){
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

		$rootScope.formData = new FormData();

		$rootScope.activity = [];

		$rootScope.documents = [];

		$rootScope.new_activity = {
			add_to_schedule:false,
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