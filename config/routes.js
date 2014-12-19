// Draw routes.  Locomotive's router provides expressive syntax for drawing
// routes, including support for resourceful routes, namespaces, and nesting.
// MVC routes can be mapped to controllers using convenient
// `controller#action` shorthand.  Standard middleware in the form of
// `function(req, res, next)` is also fully supported.  Consult the Locomotive
// Guide on [routing](http://locomotivejs.org/guide/routing.html) for additional
// information.
module.exports = function routes() {
  this.root('pages#main');

  //this.post('/login','auth#create');
  //this.get('/home', 'pages#main');
  this.get('/home', 'pages#home');
  this.post('/getCategorie','auth#getCategorie');
  this.post('/login', 'auth#login');
  /**
   * Contact/Client routes 
   */
  this.post('/createContact','data#createContact');
  this.post('/getContact','data#getContact');
  this.post('/updateContact','data#updateContact');
  this.get('/getUniqueNumber', 'data#getUniqueNumber');

  this.post('/uploadFile', 'data#uploadFile');

  this.post('/saveMatter', 'data#saveMatter');

  this.get('/getMatters/:matterType', 'data#getMatters');
  this.post('/updateMatter', 'data#updateMatter');
  this.post('/download/documents', 'data#downloadDocuments');
  this.post('/deleteMatter', 'data#deleteMatter');
  this.post('/saveSchedule', 'data#saveSchedule');

  this.get('/getSchedules', 'data#getSchedules');

  this.get('/getContacts', 'data#getContacts');


  this.get('/isLoginedIn', 'pages#isLoginedIn');
}
