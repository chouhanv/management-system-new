angular.module('myApp.matterController', [])
.controller('matterController', function( $rootScope, $scope, $window, $location,$http, fileUpload, notificationMessage) {

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
	 	$rootScope.isEditMatter = st;
	 }

	$rootScope.getContactName = function(id){
	 	angular.forEach($rootScope.allContactes, function(val, i){
	 		if(val._id == id){
	 			return val.name.firstname + " " + val.name.lastname;
	 		}
	 	});
	 }
	$rootScope.getFileExtension = function(filename)
	{
	    var ext = filename.split('.').pop();
	    if(ext == filename) return "";
	    return ext.toUpperCase();
	}
	// $rootScope.getContact = function(clientdata)
	// {
 //     	if (clientdata.name.firstname !='' && clientdata.name.lastname !='')
 //     	{
	//      	for(var i=0; i<3; i++)
	//      	{
	//      	 	if(clientdata.phones[i].number)
	//      		{
	//             	return clientdata.name.firstname + " " + clientdata.name.lastname +" "+clientdata.phones[i].number;
	//         	}
	//      	}
 // 	 		return clientdata.name.firstname + " " + clientdata.name.lastname;
	// 	}
	// 	else if(clientdata.name.firstname)
	// 	{
	// 		for(var i=0; i<3; i++)
	//      	{
	//      		if(clientdata.phones[i].number){
	//      			return clientdata.name.firstname +" " +clientdata.phones[i].number;
	//      		}     		
	//      	}
	//      	return clientdata.name.firstname;
	// 	}
	// 	else
	// 	{
	// 		if (clientdata.company.companyname)
	// 		{
	// 	      	for(var i=0; i<3; i++)
	// 	 		{
	// 	 			if(clientdata.phones[i].number)
	// 	 			{
	// 	 				return clientdata.company.companyname+" "+clientdata.phones[i].number; 
	// 	     		}		     		
	// 			}
	// 			return clientdata.company.companyname;
	// 		}
	// 	}	
	// }

	$rootScope.addMatterTab = function(id){
	 	var matter = {};
	 	$rootScope.remarkShow = "";
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
	 	$rootScope.setIsEditMatter(false);
	 	$rootScope.showTab='matter';
	 	$rootScope.remarkShow = "";
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
		if (!window.confirm("Are you sure want to delete?") ) {
            return false;
        }

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
	 	//finding  duplicated in sellers
	 	for (var i = 0; i < $rootScope.partiesForm.sellers.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.sellers.length; j++) {
                if (i != j) {
                    if ($rootScope.partiesForm.sellers[i] && $rootScope.partiesForm.sellers[i] && $rootScope.partiesForm.sellers[i] == $rootScope.partiesForm.sellers[j]) {
                        alert("Sellers can not be duplicates.");
						return false;
                    }
                }
            }
        }
        
        //finding  duplicated in buyers
        for (var i = 0; i < $rootScope.partiesForm.buyers.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers.length; j++) {
                if (i != j) {
                    if ($rootScope.partiesForm.buyers[i] && $rootScope.partiesForm.buyers[j] && $rootScope.partiesForm.buyers[i] == $rootScope.partiesForm.buyers[j]) {
                        alert("Buyers can not be duplicates.");
						return false;
                    }
                }
            }
        }

		//checking salers and buyers
		for (var i = 0; i < $rootScope.partiesForm.sellers.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers.length; j++) {
                if ($rootScope.partiesForm.sellers[i] && $rootScope.partiesForm.buyers[j] && $rootScope.partiesForm.sellers[i] == $rootScope.partiesForm.buyers[j]) {
                    alert("Sellers and Buyers can not be same.");
					return false;
                }
            }
        }

        //checking salers and buyers ajent
		for (var i = 0; i < $rootScope.partiesForm.sellers_agent.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers_agent.length; j++) {
                if ($rootScope.partiesForm.sellers_agent[i] && $rootScope.partiesForm.buyers_agent[j] && $rootScope.partiesForm.sellers_agent[i] == $rootScope.partiesForm.buyers_agent[j]) {
                    alert("Sellers Agent and Buyers Agent can not be same.");
					return false;
                }
            }
        }

        //checking salers and buyers attorney
		for (var i = 0; i < $rootScope.partiesForm.sellers_attorney.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers_attorney.length; j++) {
                if ($rootScope.partiesForm.sellers_attorney[i] && $rootScope.partiesForm.buyers_attorney[j] && $rootScope.partiesForm.sellers_attorney[i] == $rootScope.partiesForm.buyers_attorney[j]) {
                    alert("Sellers Attorney and Buyers Attorney can not be same.");
					return false;
                }
            }
        }
	    $('.matterslist a').click();
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
				notificationMessage.show(data.message);
				$rootScope.getMatters();
			} else {
				notificationMessage.show(data.message);
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
			//if(val.is_checked){
				downloadedFiles.push(val.document);
			//}
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

	$rootScope.downloadFile = function(name,address){

		$http.get(address)   
		.success(function(data){
			//$window.location = 'data:text/plain;charset=utf-8,' + encodeURIComponent(data);

			if(window.navigator.msSaveOrOpenBlob) {
	            var fileData = [data];
	            blobObject = new Blob(fileData);
	            $(anchorSelector).click(function(){
	                window.navigator.msSaveOrOpenBlob(blobObject, name);
	            });
	        } else {
	            var url = "data:application/octet-stream;charset=utf-8," + encodeURIComponent(data);
	            //$(anchorSelector).attr("download", fileName);               
	            //$(anchorSelector).attr("href", url);
	            $window.location = url;
	        }
		})
		.error(function(error){
			console.log(error);
		})

		// console.log(name, address)
		// if (confirm('you wanna save this file?')) {
  //             window.win = open(address);
  //         //    response.redirect("~/testpage.html");   



  //             // setTimeout('win.document.execCommand("SaveAs")', 100);
  //             setTimeout(function(){
  //             	if (window.ActiveXObject) {
		//             document.execCommand("SaveAs");
		//             console.log("dadsadas");
		//         } else if (window.netscape) {
		//         	console.log("dadsadas1");
		//             var r=document.createRange();
		//             r.setStartBefore($("head")[0]);
		//             var oscript=r.createContextualFragment('<script id="scriptid" type="application/x-javascript" src="chrome://global/content/contentAreaUtils.js"><\/script>');
		//             $('body').append(oscript);
		//             r=null;
		//             try {
		//                 netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
		//                 saveDocument(document);
		//             } catch (e) {
		//                 //no further notice as user explicitly denied the privilege
		//             } finally {
		//                 //re-defined
		//                //$("#scriptid").remove();
		//             }
		//         }
  //             }, 1000);
  //             // //setTimeout('win.close()', 500);
  //         }
	}


	$rootScope.initMatterTitle = function(){
		$http.get("/getNewMatterTitle")
		.success(function(data){
			$rootScope.uniqueNumber = data.uniqueNumber;
			$rootScope.matterForm.title.unique_number = data.uniqueNumber;
			$rootScope.uniqueMatterId = data.uniqueMatterId;
			$rootScope.matterForm.title.matter_id = data.uniqueMatterId;
		})
		.error(function(error){
			console.log(error);
		});
	}

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
				homenumber : "",
				streetname : "",
				streetsuffix:"",
				city:"",
				state:"",
				zip:"",
				lot:"",
				block:"",
				section:"",
				building:"",
				buildingclass:"",
				buildingtype:"",
				streetnameaka:"",
				intersectionstreet1:"",
				intersectionstreet2:"",
				country:"",
				district:"",
				districtcode:"",
				municipility:"",
				town:"",
				subdivision:"",
				neighborhood:"",
				schooldistrict:""
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
			matter_id:$rootScope.uniqueMatterId
		},
		fees_and_taxes:{
			purchase_policy_fee:"",
			purchase_policy_b_fee:"",
			homestead_tax:"",
			loan_origination_fee:"",
			maintenance_fees:""
		},
		notes:[{text:""}],
		type:"New"
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
		remark:[{user:$rootScope.logedInUser._id, note:"", date:new Date()}],
		user:$rootScope.logedInUser._id,
		date : "",
		time : ""
	};

	$rootScope.new_document = {
		name : "",
		document:$rootScope.myFile,
		notes:"",
		user : $rootScope.logedInUser._id
	}

	$rootScope.updateActivity = function(){
		if(!$rootScope.new_activity.activity) {
			alert("Please select activity.");
			return false;
		} else if(!$rootScope.new_activity.date){
			alert("Please select activity date.");
			return false;
		} else if(!$rootScope.new_activity.time){
			alert("Please select activity time.");
			return false;
		}
		$rootScope.activity_form_submited = false;
		$rootScope.activity.splice($rootScope.activityEditIndex, 1, $rootScope.new_activity);
		$rootScope.resetActivity();
		$rootScope.updateMatter(false);
		setTimeout(function(){$(".close-activity-model-edit").click();},500);
	}

	$rootScope.updateDocument = function(){
		if($rootScope.new_document.name == "") {
			alert("Please select document type.");
			return false;
		} else if($rootScope.new_document.notes == ""){
			alert("Please enter document note.");
			return false;
		}
		if($("#editdocumentfile")[0].files[0]) {
			var ext = $("#editdocumentfile")[0].files[0].name.substring($("#editdocumentfile")[0].files[0].name.lastIndexOf('.'), $("#editdocumentfile")[0].files[0].name.length);
			if(ext != '.pdf' && ext != '.doc' && ext != '.docx' && ext != '.txt'){
				alert("Upload only pdf, doc or txt files");
				return false;
			}
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
		if(!$rootScope.new_activity.activity) {
			alert("Please select activity.");
			return false;
		} else if(!$rootScope.new_activity.date){
			alert("Please select activity date.");
			return false;
		} else if(!$rootScope.new_activity.time){
			alert("Please select activity time.");
			return false;
		}
		$rootScope.activity.push($rootScope.new_activity);
		$rootScope.remarkShow = $rootScope.new_activity.remark;
		$rootScope.remarkShowIndex = $rootScope.activity.length-1;
		$rootScope.resetActivity();
		if(isMatterExist){
			$rootScope.updateMatter(false);
		}
		setTimeout(function(){$(".close-activity-model").click();},500);
	}

	$rootScope.saveDocument = function(isMatterExist){
		if($rootScope.new_document.name == "") {
			alert("Please select document type.");
			return false;
		} else if($rootScope.new_document.notes == ""){
			alert("Please enter document note.");
			return false;
		} else if(!$("#file")[0].files[0]){
			alert("Please select document file.");
			return false;
		}
		var ext = $("#file")[0].files[0].name.substring($("#file")[0].files[0].name.lastIndexOf('.'), $("#file")[0].files[0].name.length);
		if(ext != '.pdf' && ext != '.doc' && ext != '.docx' && ext != '.txt' ){
			alert("Upload only pdf, doc or txt files");
			return false;
		}
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
			remark:[{user:$rootScope.logedInUser._id, note:"", date:new Date()}],
			user:$rootScope.logedInUser._id,
			date : "",
			time : ""
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

		// $("#activity_date").val(activity.date);
		// $("#activity_time").val(activity.time);
		// $("#activity_schedule").val(activity.add_to_schedule);
		// $("#activity_type").val(activity.activity);
		// $("#activity_remark").val(activity.remark);
		// $(".note-editable").html(activity.remark);
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
		//finding  duplicated in sellers
	 	for (var i = 0; i < $rootScope.partiesForm.sellers.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.sellers.length; j++) {
                if (i != j) {
                    if ($rootScope.partiesForm.sellers[i] && $rootScope.partiesForm.sellers[i] && $rootScope.partiesForm.sellers[i] == $rootScope.partiesForm.sellers[j]) {
                        alert("Sellers can not be duplicates.");
						return false;
                    }
                }
            }
        }
        
        //finding  duplicated in buyers
        for (var i = 0; i < $rootScope.partiesForm.buyers.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers.length; j++) {
                if (i != j) {
                    if ($rootScope.partiesForm.buyers[i] && $rootScope.partiesForm.buyers[j] && $rootScope.partiesForm.buyers[i] == $rootScope.partiesForm.buyers[j]) {
                        alert("Buyers can not be duplicates.");
						return false;
                    }
                }
            }
        }

		//checking salers and buyers
		for (var i = 0; i < $rootScope.partiesForm.sellers.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers.length; j++) {
                if ($rootScope.partiesForm.sellers[i] && $rootScope.partiesForm.buyers[j] && $rootScope.partiesForm.sellers[i] == $rootScope.partiesForm.buyers[j]) {
                    alert("Sellers and Buyers can not be same.");
					return false;
                }
            }
        }

        //checking salers and buyers ajent
		for (var i = 0; i < $rootScope.partiesForm.sellers_agent.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers_agent.length; j++) {
                if ($rootScope.partiesForm.sellers_agent[i] && $rootScope.partiesForm.buyers_agent[j] && $rootScope.partiesForm.sellers_agent[i] == $rootScope.partiesForm.buyers_agent[j]) {
                    alert("Sellers Agent and Buyers Agent can not be same.");
					return false;
                }
            }
        }

        //checking salers and buyers attorney
		for (var i = 0; i < $rootScope.partiesForm.sellers_attorney.length; i++) {
            for (var j = 0; j < $rootScope.partiesForm.buyers_attorney.length; j++) {
                if ($rootScope.partiesForm.sellers_attorney[i] && $rootScope.partiesForm.buyers_attorney[j] && $rootScope.partiesForm.sellers_attorney[i] == $rootScope.partiesForm.buyers_attorney[j]) {
                    alert("Sellers Attorney and Buyers Attorney can not be same.");
					return false;
                }
            }
        }

		$http.post('/saveMatter', {
			matter:$rootScope.matterForm,
			parties:$rootScope.partiesForm,
			activity:$rootScope.activity,
			documents:$rootScope.documents
		})
		.success(function(data){
			if(data.success){
				notificationMessage.show(data.message);
				$rootScope.matter_form_submited = false;
				$rootScope.parties_form_submiter = false;
				$rootScope.discardNewMatter();
				$rootScope.getMatters();
			} else {
				notificationMessage.show(data.message);
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
			if($rootScope.matterForm.property.matter_name)
				$rootScope.openTab('parties');
			else setTimeout(function(){
				$('#newmatter').animate({scrollTop: 0}, 1000);
			},100);
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
					homenumber : "",
					streetname : "",
					streetsuffix:"",
					city:"",
					state:"",
					zip:"",
					lot:"",
					block:"",
					section:"",
					building:"",
					buildingclass:"",
					buildingtype:"",
					streetnameaka:"",
					intersectionstreet1:"",
					intersectionstreet2:"",
					country:"",
					district:"",
					districtcode:"",
					municipility:"",
					town:"",
					subdivision:"",
					neighborhood:"",
					schooldistrict:""
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
				matter_id:$rootScope.uniqueMatterId
			},
			fees_and_taxes:{
				purchase_policy_fee:"",
				purchase_policy_b_fee:"",
				homestead_tax:"",
				loan_origination_fee:"",
				maintenance_fees:""
			},
			notes:[{text:""}],
			type:"New"
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
			remark:[{user:$rootScope.logedInUser._id, note:"", date:new Date()}],
			user:$rootScope.logedInUser._id,
			date : "",
			time : ""
		};

		$rootScope.new_document = {
			name : "",
			document:$rootScope.myFile,
			notes:"",
			user : $rootScope.logedInUser._id,
			date : new Date()
		}
	}

	$rootScope.setRemarkShow = function(index, type){
		$rootScope.remarkShow = $rootScope.activity[index].remark;
		$rootScope.remarkShowIndex = index;
	}
	$rootScope.new_note_for_activity = {note:""};
	$scope.addNoteForActivity = function(){
		$rootScope.activity[$rootScope.remarkShowIndex].remark.push({
			user:$rootScope.logedInUser._id, 
			note:$rootScope.new_note_for_activity.note, 
			date:new Date()});
		$rootScope.new_note_for_activity.note = '';
		$('#close-note-model-add').click();
		console.log($rootScope.activity);
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
					homenumber:"",
					streetname : "",
					streetsuffix:"",
					city:"",
					state:"",
					zip:"",
					lot:"",
					block:"",
					section:"",
					building:"",
					buildingclass:"",
					buildingtype:"",
					streetnameaka:"",
					intersectionstreet1:"",
					intersectionstreet2:"",
					country:"",
					district:"",
					districtcode:"",
					municipility:"",
					town:"",
					subdivision:"",
					neighborhood:"",
					schooldistrict:""
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
				matter_id:$rootScope.uniqueMatterId
			},
			fees_and_taxes:{
				purchase_policy_fee:"",
				purchase_policy_b_fee:"",
				homestead_tax:"",
				loan_origination_fee:"",
				maintenance_fees:""
			},
			notes:[{text:""}],
			type : "New"
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
			remark:[{user:$rootScope.logedInUser._id, note:"", date:new Date()}],
			user:$rootScope.logedInUser._id,
			date : "",
			time : ""
		};

		$rootScope.new_document = {
			name : "",
			document:$rootScope.myFile,
			notes:"",
			user : $rootScope.logedInUser._id
		}
	}

	$rootScope.initPartiesForm = function(){
		$rootScope.partiesForm = $rootScope.matters[0].parties;
		for (var key in $rootScope.partiesForm) {
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
	}
});