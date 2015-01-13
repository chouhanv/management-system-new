var locomotive = require('locomotive')
  , Controller = locomotive.Controller
  , adminUsers =require('../models/adminusers');

var pagesController = new Controller();

pagesController.main = function() {
  this.title = 'Locomotive';
  var req = this.req;
  console.log(req.user);
  if(req.user){
  	this.render('home', {user:user});
  } else {
  	this.render();
  }
}

pagesController.home = function(){
	var th = this;
	var id = th.req.param('id');
	if(id){
		adminUsers.findOne({_id:id}, function(err, user){
			if(err){
				console.log(err);
				th.redirect('back');
			} else if(user){
				delete user.password;
				th.render({user:user});
			} else {
				th.redirect('back');
			}
		});
	} else {
		th.redirect('back');
	}
}

pagesController.isLoginedIn = function(){
	var th = this;
	var req = th.req;
	var res = th.res;
	if(req.user){
		res.json({success:true,user:user});
	} else {
		res.json({success:true,message:"User is not loginedin"});
	}
}

module.exports = pagesController;
