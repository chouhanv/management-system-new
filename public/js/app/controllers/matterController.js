angular.module('myApp.matterController', [])
.controller('matterController', function( $rootScope, $scope, $window, $location,$http, fileUpload) {

	 $rootScope.setMatterType = function(matterType){
	 	$rootScope.currentMatterType = matterType;
	 }

	 $rootScope.matterTabShow = 'listTab';
	 $rootScope.matterTabs = [];
	 $rootScope.openedMatters = [];

	 $rootScope.sortDocument = "";
	 $rootScope.sortActivity = "";
	 $rootScope.isEditMatter = false;

	 $rootScope.setIsEditMatter = function(st){
	 	console.log(st);
	 	$rootScope.isEditMatter = st;
	 }

	$rootScope.getContactName = function(id){
	 	angular.forEach($rootScope.allContactes, function(val, i){
	 		if(val._id == id){
	 			return val.name.firstname + " " + val.name.lastname;
	 		}
	 	});
	 }

	 $rootScope.addMatterTab = function(id){
	 	var matter = {};
		angular.forEach($rootScope.matters, function(val, i){
			if(val._id == id){
				matter = angular.copy($rootScope.matters[i]);
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
	 	for (var key in matter.parties) {
			//console.log(matter.parties[key]);
			if($.isArray(matter.parties[key])){
				var arr = [];
				if(matter.parties[key].length>0)
					angular.forEach(matter.parties[key], function(val,i){
						if(val && val._id)
							arr.push(val._id);
						else
							arr.push(null);
					});
				else arr.push(null);
				matter.parties[key] = arr;
			} else {
				if(matter.parties[key] && matter.parties[key]._id)
					matter.parties[key] = matter.parties[key]._id;
				else
					matter.parties[key] = null;
			}
		}

	 	if(!isOpened){
	 		$rootScope.matterTabs.push({name:matter.matter.property.matter_name, _id:matter._id, class:'active'});
	 		$rootScope.openedMatters.push(matter);
	 	}

	 	$rootScope.matterForm = matter.matter;
 		$rootScope.partiesForm = matter.parties;
		// for (var key in $rootScope.partiesForm) {
		// 	console.log($rootScope.partiesForm[key]);
		// 	if($.isArray($rootScope.partiesForm[key])){
		// 		var arr = [];
		// 		angular.forEach($rootScope.partiesForm[key], function(val,i){
		// 			if(val && val._id)
		// 				arr.push(val._id);
		// 			else
		// 				arr.push(null);
		// 		});
		// 		$rootScope.partiesForm[key] = arr;
		// 	} else {
		// 		if($rootScope.partiesForm[key] && $rootScope.partiesForm[key]._id)
		// 			$rootScope.partiesForm[key] = $rootScope.partiesForm[key]._id;
		// 		else
		// 			$rootScope.partiesForm[key] = null;
		// 	}
		// }
 		$rootScope.activity = matter.activity;
 		$rootScope.documents = matter.documents;
 		$rootScope.matter_id = matter._id;
 		$rootScope.matterTabShow = 'matterTab';
 		$(".matterslist").removeClass("active");
 		$(".newmatter").removeClass("active");
		setTimeout(function(){
			$(".matter"+id).addClass('active');
			$("#matterTab"+id).find("a").get(0).click();
			$rootScope.$apply();
		},100);
	 }

	 $rootScope.setSelectedActivityToShowRemark = function(activity){
		$rootScope.selectedActivityToShowRemark = activity;
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
	 			$rootScope.editedMatterId = matter._id;
	 			$rootScope.matterTabs[i].class = 'active';
			 	$rootScope.matterForm = matter.matter;
		 		$rootScope.partiesForm = matter.parties;
		 		$rootScope.activity = matter.activity;
		 		$rootScope.documents = matter.documents;
		 		$rootScope.matter_id = matter._id;
		 		$rootScope.matterTabShow = 'matterTab';
		 		if($rootScope.activity.length>0){
		 			$rootScope.remarkShow = $rootScope.activity[0].remark;
		 			setTimeout(function(){
		 				$(".remark-editor .note-editable").html($rootScope.activity[0].remark);
		 			},100);
		 		}
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

	$rootScope.deleteMatter = function(id){
	 	$http.post('/deleteMatter', {id:id})
	 	.success(function(data){
	 		if(data.success){
	 			angular.forEach($rootScope.openedMatters, function(val,i){
	 				if(val._id == id){
	 					$rootScope.openedMatters.splice(i,1);
	 				}
	 			})

	 			angular.forEach($rootScope.matterTabs, function(val,i){
	 				if(val._id == id){
	 					$rootScope.matterTabs.splice(i,1);
	 					setTimeout(function(){
							$(".matterslist a").click();
						},100);
	 				}
	 			});

	 			angular.forEach($rootScope.matters, function(val, i){
	 				if(val._id == id)
	 					$rootScope.matters.splice(i, 1);
	 			});
	 		} else {
	 			console.log("not Successfully.");
	 		}
	 	})
	 	.error(function(error){
	 		console.log(error);
	 	});
	 }

	 $rootScope.updateMatter = function(isShowList){
	 	$rootScope.matterUpdateMessage = "Saving Matter....";
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
				$rootScope.getMatters();
				setTimeout(function(){
					$rootScope.matterUpdateMessage = "";
					$rootScope.$apply();
				}, 5000);
				// setTimeout(function(){
				// 	if(isShowList) $(".matterslist a").click();
				// },1000);
			} else {
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

	 // $rootScope.deleteMatter = function(id){
	 // 	$http.post('/deleteMatter', {id:id})
	 // 	.success(function(data){
	 // 		if(data.success){
	 // 			angular.forEach($rootScope.matters, function(val, i){
	 // 				if(val._id == id)
	 // 					$rootScope.matters.splice(i, 1);
	 // 			});
	 // 		}
	 // 	})
	 // 	.error(function(error){
	 // 		console.log(error);
	 // 	})
	 // }

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


	$http.get("/getNewMatterTitle")
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
			property_type_subtype:"",
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
			unique_number:$rootScope.uniqueNumber
		},
		fees_and_taxes:{
			purchase_policy_fee:"",
			purchase_policy_b_fee:"",
			homestead_tax:"",
			loan_origination_fee:"",
			maintenance_fees:""
		},
		notes:[{text:""}],
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
		loan_officer:null,
		surveyor:null,
		past_inspector:null,
		building_inspector:null,
		additionalfields:[],
		title_company:null,
		abstract_search:null,
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
		user: $rootScope.logedInUser._id
	};

	$rootScope.new_document = {
		name : "",
		document:$rootScope.myFile,
		notes:"",
		user : $rootScope.logedInUser._id
	}

	$rootScope.updateActivity = function(){
		$rootScope.activity_form_submited = false;
		$rootScope.activity.splice($rootScope.activityEditIndex, 1, $rootScope.new_activity);
		$rootScope.resetActivity();
		$rootScope.updateMatter(false);
	}

	$rootScope.updateDocument = function(){
		
		if($("#editdocumentfile")[0].files[0]) {
			var uploadUrl = "/uploadFile";
			$rootScope.fileUploadMessage = "Uploading document....";
			fileUpload.uploadFileToUrl($("#editdocumentfile")[0].files[0], uploadUrl, function(err, path){
				if(err){
					console.log(err);
				} else {
					$rootScope.fileUploadMessage = "Document saved."
					$rootScope.new_document.document  = path;
					$rootScope.documents.splice($rootScope.documentEditIndex,1,$rootScope.new_document);
					$rootScope.resetDocument();
					$rootScope.updateMatter(false);
					$rootScope.document_form_submited = false;
					$rootScope.documentFileRequired = false;
					setTimeout(function(){$("#close-document-model-edit").click();},500);
					$("#editdocumentfile").replaceWith($("#editdocumentfile").val('').clone(true));
				}
			});

		} else {
			$rootScope.documents.splice($rootScope.documentEditIndex,1,$rootScope.new_document);
			$rootScope.resetDocument();
			$rootScope.updateMatter(false);
			setTimeout(function(){$("#close-document-model-edit").click();},500);
		}
	}

	$rootScope.saveActivity = function(isMatterExist){
		$rootScope.activity.push($rootScope.new_activity);
		$rootScope.remarkShow = $rootScope.new_activity.remark;
		
		setTimeout(function(){
			if(isMatterExist)
				$(".remark-editor .note-editable").html($rootScope.remarkShow);
			else
				$(".remark-editor-new .note-editable").html($rootScope.remarkShow);
		},10);
		
		$rootScope.resetActivity();
		if(isMatterExist){
			$rootScope.updateMatter(false);
		}
	}

	$rootScope.saveDocument = function(isMatterExist){
		var uploadUrl = "/uploadFile";
		$rootScope.fileUploadMessage = "Uploading document....";
		if(!$("#file")[0].files[0]) {
			$rootScope.fileUploadMessage = "Please select document.";
			return 0;
		}
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
				$("#file").replaceWith($("#file").val('').clone(true));
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
			user:$rootScope.logedInUser._id
		};

		$("#activity_date").val(null);
		$("#activity_time").val(null);
		$("#activity_schedule").val(false);
		$("#activity_type").val("");
		$("#activity_remark").val("");
		$(".note-editable").html("");

		// $rootScope.$apply();
	}

	$rootScope.resetDocument = function(){
		$rootScope.new_document.name = "";
		$rootScope.new_document.notes = "";
		$rootScope.new_document.user = $rootScope.logedInUser._id;
		$rootScope.documentEditIndex = "";
		$rootScope.new_document.document = "";
		$("#file").replaceWith($("#file").clone());
		$("#editdocumentfile").replaceWith($("#editdocumentfile").clone());
		$rootScope.$apply();
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

	$rootScope.deleteActivity = function(index){
		$rootScope.activity.splice(index,1);
		$rootScope.updateMatter(false);
	}

	$rootScope.editDocument = function(d,index){
		$rootScope.new_document.name = d.name;
		$rootScope.new_document.notes = d.notes;
		$rootScope.new_document.user = d.user;
		$rootScope.documentEditIndex = index;
	}

	$rootScope.deleteDocument = function(index){
		$rootScope.documents.splice(index,1);
		$rootScope.updateMatter(false);
	}

	$rootScope.resetDocument = function(){
		$rootScope.new_document = {
			name : "",
			document:"",
			notes:"",
			user : $rootScope.logedInUser._id
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
					$rootScope.isNewMatter = false;
					$rootScope.$apply();
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
		$rootScope.remarkShow = "";
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
				property_type_subtype:"",
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
				unique_number:$rootScope.uniqueNumber
			},
			fees_and_taxes:{
				purchase_policy_fee:"",
				purchase_policy_b_fee:"",
				homestead_tax:"",
				loan_origination_fee:"",
				maintenance_fees:""
			},
			notes:[{text:""}],
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
			loan_officer:null,
			surveyor:null,
			past_inspector:null,
			building_inspector:null,
			additionalfields:[],
			title_company:null,
			abstract_search:null,
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
			user:$rootScope.logedInUser._id
		};


		$rootScope.new_document = {
			name : "",
			document:$rootScope.myFile,
			notes:"",
			user : $rootScope.logedInUser._id
		}

	}

	$rootScope.setRemarkShow = function(remark, type){
		$rootScope.remarkShow = remark;
		if(type) $(".remark-editor .note-editable").html($rootScope.remarkShow);
		else $(".remark-editor-new .note-editable").html($rootScope.remarkShow);
	}

	$rootScope.getUserDetail = function(userId){
		// $http.get('/userDetail/'+userId)
		// .success(function(data){
		// 	if(data.success){
		// 		if(data.user) return data.user;
		// 		else return {imageSrc:'/assets/images/users/User_Avatar_Gray.png'}
		// 	}
		// 	else {
		// 		console.log(user);
		// 	}
		// })
		// .error(function(error){
		// 	console.log(error);
		// });

		return function(){
			var find = false;
			angular.forEach($rootScope.adminUsers, function(val, i){
				if(val._id == userId){
					find = true
					return val;
				}
			});
			if(!find) return {imageSrc:'/assets/images/users/User_Avatar_Gray.png'}
		}
	}


	$rootScope.resetMatterData = function(){
		$rootScope.matterForm = {
			property : {

				matter_name:"",
				sales_type:"",
				property_type:"",
				property_type_subtype:"",
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
				unique_number:$rootScope.uniqueNumber
			},
			fees_and_taxes:{
				purchase_policy_fee:"",
				purchase_policy_b_fee:"",
				homestead_tax:"",
				loan_origination_fee:"",
				maintenance_fees:""
			},
			notes:[{text:""}],
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
			loan_officer:null,
			surveyor:null,
			past_inspector:null,
			building_inspector:null,
			additionalfields:[],
			title_company:null,
			abstract_search:null,
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
			user:$rootScope.logedInUser._id
		};

		$rootScope.new_document = {
			name : "",
			document:$rootScope.myFile,
			notes:"",
			user : $rootScope.logedInUser._id
		}
	}
});