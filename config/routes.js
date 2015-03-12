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
  this.get('/home/:id', 'pages#home');
  this.get('/lockscreen', 'pages#lockscreen');
  this.post('/getCategorie','auth#getCategorie');
  this.post('/login', 'auth#login');
  /**
   * Contact/Client routes 
  */
  this.post('/createContact','data#createContact');
  this.post('/getContact','data#getContact');
  this.post('/updateContact','data#updateContact');
  this.get('/getNewMatterTitle', 'data#getNewMatterTitle');
  this.post('/uploadFile', 'data#uploadFile');
  this.post('/saveMatter', 'data#saveMatter');
  this.get('/getMatters/:matterType', 'data#getMatters');
  this.post('/updateMatter', 'data#updateMatter');
  this.post('/download/documents', 'data#downloadDocuments');
  this.post('/deleteMatter', 'data#deleteMatter');

  this.post('/saveSchedule', 'data#saveSchedule');
  this.post('/deleteSchedule', 'data#deleteSchedule');
  this.get('/getSchedules', 'data#getSchedules');
  this.post('/ignoreScheudle', 'data#ignoreScheudle');

  this.get('/getContacts', 'data#getContacts');
  this.post('/deleteContact', 'data#deleteContact');
  this.get('/getTotalContacts', 'data#getTotalContacts');

  this.get('/isLoginedIn', 'pages#isLoginedIn');

  this.get('/getAdminUsers', 'data#getAdminUsers');
  this.post('/saveAdminUsers', 'data#saveAdminUsers');

  this.get('/getUserDetail/:id', 'data#getUserDetail');

  this.post('/saveTask', 'data#saveTask');
  this.get('/getTasks','data#getTasks');
  this.get('/uploadXlsx','data#uploadXlsx');
  this.post('/uploadxlsfile','data#uploadxlsfile');
}
