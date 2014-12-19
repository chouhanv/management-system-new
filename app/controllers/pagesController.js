var locomotive = require('locomotive')
  , Controller = locomotive.Controller;

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
	this.render();
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
