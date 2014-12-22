var locomotive = require('locomotive'),
    Controller = locomotive.Controller,
    Categorie = require('../models/categories');

var authController = new Controller();


authController.login = function(){
	var th = this;
	var req = this.req;
	var res = this.res;
	var username = req.body.username;
	var password = req.body.password;
	if(username){
		if(password){
			if(username == 'nimra@lawoffice.com' && password == 'admin123'){
				req.user = {
					username : 'nimra@lawoffice.com'
				};
				console.log(req.user);
				res.json({success:true});
			} else {
				res.json({success:false,error:"Invalid username or password."});
			}
		} else {
			res.json({success:false,error:"Password Required"});
		}
	} else {
		res.json({success:false,error:"Username Required"});
	}
}


authController.create = function(req,res) {
 console.log("call method");
 var th = this;
 var email = th.req.body.email; 
 var password = th.req.body.password;
 console.log(email,password);
 if (email=="admin@gmail.com")
 	{   console.log('email',email);
 		if (password == "admin")
 			{
                  th.res.json({message : "2"});
 			}
 			else
 			{
 				th.res.json({message : "Your password is incorrect"});
 			}
 	}
 	else
 	{
       th.res.json({message : "Your email is incorrect"});
 	}
}
authController.home = function(req,res) {
	var th = this;
	th.render();

}
authController.getCategorie = function(req,res) {
 var th = this;
 Categorie.find({},function(err,data){
 	if(err){
 			console.log(err);
 			th.res.json({message : "DB Error"});
 		}
 		else{
 		    th.res.json({categorie : data});
 		}
   })	
}

module.exports = authController;
