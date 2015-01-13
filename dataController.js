var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    Contacts = require('../models/contacts'),
    Matters = require('../models/matters'),
    Schedules = require('../models/schedules'),
    ClientWebLogin =require('../models/clientweblogin'),
    mongoose = require('mongoose');
    var path = require('path');
    var fs = require('fs');
    var nodemailer = require("nodemailer");

    var DOCUMENT_UPLOAD_PATH = '../../../public/documents';
    var JSZip = require("jszip");
var dataController = new Controller();

dataController.createContact = function(req,res) {
 var th = this;

 Contacts.create(th.req.body.contactdata, function(err, data){
 	if(err) {
 		console.log(err);
 		th.res.json({message : err});
 	}
 	else {

 		if(th.req.body.weblogin && th.req.body.weblogin.email && th.req.body.weblogin.password){
 			th.req.body.weblogin.contact = data._id;
 			ClientWebLogin.create(th.req.body.weblogin, function(err, data1){
 				if(err) console.log(err);
 				else {

                  	var smtpTransport = nodemailer.createTransport("SMTP",{
					   service: "Gmail",  // sets automatically host, port and connection security settings
					   auth: {
					       user: "sachinj.linkites@gmail.com",
					       pass: "9424045320"
					   }
					});
                	smtpTransport.sendMail({  //email options
			 		   from: "REAMM <sachinj.linkites@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
					   to: "Receiver Name <" + th.req.body.weblogin.email + ">", // receiver
					   subject: "REAMM Client Account", // subject
					   html: "<h3>Hello " + data.name.firstname + " " + data.name.lastname +"</h3>"
					   			+ " Your REAMM account has been created as clieng. <br> Please find your login detail below <br>" 
					   			+ "Email :"  + th.req.body.weblogin.email + "</b><br>Password : <b>" 
					   			+ th.req.body.weblogin.password + "</b>"
					   			+ "<h4>Thanks<h4><br><i>REAMM(http://www.reamm.com)"

					}, function(error, response){  //callback
					   if(error){
					       console.log(error);
					   }else{
					   	console.log("saaaaaaaaaaaa");
					       console.log("Message sent: " + response.message);
					   }
					   
					   smtpTransport.close(); 
					});
 				}
 			});
 		}
      th.res.json({contact : data,message : "Contact Saved successfully "});
 	} 
 });
}
dataController.getContact = function(req,res){
	var th = this;
	var id = th.req.body.category_id;
	Contacts.find({category_id : id},function(err,data){
		console.log(err, data);
		if (err) {
				console.log(err);
				th.res.json({message : "Try Again"});
			}
		else {
			th.res.json({data : data});
		}
	});
}

dataController.updateContact = function(){
	var th = this;
	var req = th.req;
	var res = th.res;
	console.log("contact_id",req.body.contactdata.contact_id);
	Contacts.update({_id:req.body.contactdata.contact_id}, req.body.contactdata, function(err, status){
		if(err){
			res.json({success:false,message:"Error in processing."});
		} else if(status) {

			if(th.req.body.weblogin && th.req.body.weblogin.email && th.req.body.weblogin.password){
	 			th.req.body.weblogin.contact = req.body.contactdata._id;
	 			ClientWebLogin.update({_id:th.req.body.weblogin._id},{
	 				email:th.req.body.weblogin.email,
	 				password:th.req.body.weblogin.password,
	 				is_enabled:th.req.body.weblogin.is_enabled
	 			}, function(err, data1){
	 				if(err) console.log(err);
	 				else {
	                  	var smtpTransport = nodemailer.createTransport("SMTP",{
						   service: "Gmail",  // sets automatically host, port and connection security settings
						   auth: {
						       user: "sachinj.linkites@gmail.com",
						       pass: "9424045320"
						   }
						});
	                	smtpTransport.sendMail({  //email options
				 		   from: "REAMM <sachinj.linkites@gmail.com>", // sender address.  Must be the same as authenticated user if using Gmail.
						   to: "Receiver Name <" + th.req.body.weblogin.email + ">", // receiver
						   subject: "REAMM Client Account Update", // subject
						   html: "<h3>Hello " + req.body.contactdata.name.firstname + " " + req.body.contactdata.name.lastname +"</h3>"
						   			+ " Your REAMM account has been updated as client. <br> Please find your login detail below <br>" 
						   			+ "Email :"  + th.req.body.weblogin.email + "</b><br>Password : <b>" 
						   			+ th.req.body.weblogin.password + "</b>"
						   			+ "<h4>Thanks<h4><br><i>REAMM(http://www.reamm.com)"

						}, function(error, response){  //callback
						   if(error){
						       console.log(error);
						   }else{
						   	console.log("saaaaaaaaaaaa");
						    
						   }
						   
						   smtpTransport.close(); 
						});
	 				}
	 			});
	 		}

			res.json({success:true,message:"Contact updated successfully."});
		} else {
			res.json({success:true,message:"Error in processing."});
		}
	});
}

dataController.updateContactEdit = function(){
	var th = this;
	var req = th.req;
	var res = th.res;
	console.log("contact_id",req.body.contactdata.contact_id);
	Contacts.update({_id:req.body.contactdata.contact_id}, req.body.contactdata, function(err, status){
		if(err){
			res.json({success:false,message:"Error in processing."});
		} else if(status) {
			res.json({success:true,message:"Contact updated successfully."});
		} else {
			res.json({success:true,message:"Error in processing."});
		}
	});
}


dataController.getNewMatterTitle = function(){
	var th = this;
	 function randString(){
	 	var chars = "ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = 6;
		var str = '';
		var charCount = 0;
		var numCount = 0;

		 for (var i=0; i<string_length; i++) {
		      // If random bit is 0, there are less than 3 digits already saved, and there are not already 5 characters saved, generate a numeric value. 
		    if((Math.floor(Math.random() * 2) == 0) && numCount < 3 || charCount >= 5) {
		        var rnum = Math.floor(Math.random() * 10);
		        str += rnum;
		        numCount += 1;
		    } else {
		          //If any of the above criteria fail, go ahead and generate an alpha character from the chars string
		        var rnum = Math.floor(Math.random() * chars.length);
		        str += chars.substring(rnum,rnum+1);
		        charCount += 1;
		    }
		}
	 	return str;
	 }

	function getTitle(){
	 	var title = randString();
	 	Matters.findOne({"matter.title.unique_number":title}, function(err, data){
	 		if(err || data) getTitle();
	 		else th.res.json({success:true,uniqueNumber:"REAMM-"+title});
	 	});
	}
	getTitle();
}

dataController.uploadFile = function(){
	var th = this;
	var file = th.req.files.file;
	fs.readFile(file.path, function (err, data) {
		if(err){
			th.res.json({success:false, error:err});
		} else {
			var file_name = path.basename(file.name, path.extname(file.name)) + "" + new Date().getTime() + path.extname(file.name);
			var destination_path = path.resolve(__dirname + DOCUMENT_UPLOAD_PATH + "/" + file_name);
			fs.writeFile(destination_path, data, function (err) {
				if(err) {
					th.res.json({success:false, error:err});
				} else {
					th.res.json({success:true, fileName:file_name});
				}
			});
		}
	});
}

dataController.saveMatter = function(){
	var th = this;
	if(th.req.body){
		Matters.create(th.req.body, function(err, matter){
			if(err){
				console.log(err);
				th.res.json({success:false, message:"Error in processing request"});
			} else if(!matter){
				th.res.json({success:false, message:"Error in processing request"});
			} else {
				th.res.json({success:true, message:"matter created", matter:matter});
			}
		});
	} else {
		th.res.json({success:false,message:"Invalid parameters"});
	}
}

dataController.getMatters = function(){
	var th = this;
	var matterType = th.req.param('matterType');
	var options = {"is_deleted":false};
	if(matterType == "Open"){
		options = {
			"matter.type" : "Open",
			"is_deleted":false,
		}
	}
	if(matterType == "Closed"){
		options = {
			"matter.type" : "Closed",
			"is_deleted":false
		}
	}
	Matters.find(options)
	 .populate({path:"parties.sellers", select:{name:1,_id:1}})
		 .populate({path:"partiebuyers_attorney", select:{name:1,_id:1}})
			.populate({path:"parties.sellers_attorney", select:{name:1,_id:1}})
				.populate({path:"parties.sellers_agent", select:{name:1,_id:1}})
					.populate({path:"parties.buyers", select:{name:1,_id:1}})
						.populate({path:"parties.buyers_attorney", select:{name:1,_id:1}})
							.populate({path:"parties.buyers_agent", select:{name:1,_id:1}})
								.populate({path:"parties.lender_attorney", select:{name:1,_id:1}})
									.populate({path:"parties.lender_agent", select:{name:1,_id:1}})
										.populate({path:"parties.surveyor", select:{name:1,_id:1}})
											.populate({path:"parties.past_inspector", select:{name:1,_id:1}})
												.populate({path:"parties.building_inspector", select:{name:1,_id:1}})
													.populate({path:"parties.additionalfields", select:{name:1,_id:1}})
														.populate({path:"parties.lender_agent", select:{name:1,_id:1}})
															.populate({path:"parties.title_company", select:{name:1,_id:1}})
																.populate({path:"parties.title_search", select:{name:1,_id:1}})
																	.populate({path:"parties.under_writer", select:{name:1,_id:1}})
																		.populate({path:"parties.closer", select:{name:1,_id:1}})
																			.populate({path:"parties.recording_office", select:{name:1,_id:1}})
																				.sort({date:-1})
																					.exec(function(error, matters){
																						if(error){
																							th.res.json({success:false, message:error});
																						} else {
																							th.res.json({success:true, matters:matters});
																						}
																					});
}

dataController.updateMatter = function(){
	var th = this;
	var id = th.req.body.matter_id;
	if(id){
		Matters.update({_id:id}, th.req.body, function(error, status){
			if(error){
				th.res.json({success:false, message:"Error in processing."});
			} else if(status){
				th.res.json({success:true, message:"Matter updated"});
			} else {
				th.res.json({success:false, message:"Matter can not be updated, please try again."});
			}
		});
	} else {
		th.res.json({success:false, message:"Invalid parameters"});
	}
}

dataController.downloadDocuments = function(){
	var th = this;
	var files = th.req.body.documents;
	if(files.length == 0){
		th.res.json({success:false,message:"Nothing to download"});
	} else {
		var zip = new JSZip();
		var i = -1;
		function next(){
			i++;
			if(i<files.length){
				console.log(files[i]);
				var file = path.resolve(__dirname + DOCUMENT_UPLOAD_PATH + "/" + files[i]);
				fs.readFile(file, function(err, strm){
					if(err){
						next();
					} else {
						var file = new Buffer(strm, 'binary').toString('base64');
						zip.file(files[i], file, {base64: true});
						next();
					}
				});
			} else {
				var buffer = zip.generate({type:"nodebuffer"});
				var outputfile = "/" + Math.random().toString(36).slice(2) + ".zip"
				var optputpath =  path.resolve(__dirname + DOCUMENT_UPLOAD_PATH + outputfile); 
				var outputurl = "/documents" + outputfile;
				fs.writeFile(optputpath, buffer, function(err) {
				  if (err){
				  	th.res.json({success:false, message:"Error in processing."});
				  }
				  else{
				  	//fs.unlink(optputpath, function (err) {});
				  	th.res.json({success:true, url:outputurl});
				  }
				});
			}
		}
		next();
	}
}

dataController.deleteMatter = function(){
	var th = this;
	var id = th.req.body.id;
	if(id){
		console.log(id);
		Matters.update({_id:id},{is_deleted:true}, function(error, status){
			if(error){
				th.res.json({success:false, message:"Error in processing."});
			} else if(status){
				console.log(status);
				th.res.json({success:true, message:"Matter deleted successfully."});
			} else {
				th.res.json({success:false, message:"Matter cann't be delete."});
			}
		});
	} else {
		th.res.json("Parameter missing");
	}
}

dataController.saveSchedule = function(){
	var th = this;
	var end = th.req.param('end');
	var start = th.req.param('start');
	var title = th.req.param('title');
	var _id = th.req.param('_id');

	if(start && title && _id){
		Schedules.update({_id:id},{end:end, start:start, title:title}, function(err, status){
			if(err){
				th.res.json({success:false, message:"Error in processing."});
			} else {
				th.res.json({success:true, message:"Schedule updated."});
			}
		});
	} else if(start && title){
		Schedules.create({end:end, start:start, title:title, created_date:new Date()}, function(err, schedule){
			if(err){
				th.res.json({success:false, message:"Error in processing."});
			} else {
				th.res.json({success:true, schedule:schedule});
			}
		});
	} else {
		th.res.json("Parameter missing");
	}
}

dataController.deleteSchedule = function(){
	var th = this;
	var req = th.req;
	var res = th.res;
	var _id = req.param('_id');
	if(_id){
		Schedules.update({_id:_id}, {is_deleted:true}, function(err, status){
			if(err){
				th.res.json({success:false, message:"Error in processing."});
			} else {
				th.res.json({success:true, message:"Schedule deleted."});
			}
		});
	} else {
		th.res.json("Parameter missing");
	}
}

dataController.getSchedules = function(){
	var th = this;
	Schedules.find({is_deleted:false}, function(error, schedules){
		if(error){
			th.res.json({success:false, message:"Error in processing."});
		} else {
			th.res.json({success:true, schedules:schedules});
		}
	})
}

dataController.getContacts = function(){
	var th = this;
	Contacts.find({})
	.populate('category_id', {_id:1,categorie:1})
	.populate('clientweblogin',{contact:0,_v:0})
	.sort({date:-1})
	.exec(function(err, contactes){
		if(err){
			th.res.json({success:false, message:"Error in processing."});
		} else {
			th.res.json({success:true, contactes:contactes});
		}
	});
}

module.exports = dataController;
