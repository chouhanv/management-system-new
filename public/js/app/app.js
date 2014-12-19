'use strict';
// Declare app level module which depends on filters, and services
var myApp = angular.module('myApp', [
  'ui.router',
  'myApp.filters',
  'myApp.services',
  'myApp.directives',
  'myApp.controllers',
  'myApp.sidebarController',
  'myApp.homeController',
  'myApp.contactController'
]);
myApp.config(function($stateProvider, $urlRouterProvider) {
  console.log("test");
	$stateProvider
    // .state('/login', {
    //   url: "/login",
    //   templateUrl: "/app/partials/login.html",
    // })
    // .state('', {
    //   url: "/",
    //   templateUrl: "/app/partials/login.html",
    // })
    .state('/contacts/list', {
      url:"/contacts/list",
      templateUrl:"/partials/contacts/list.html",
      controller : 'contactController'
    })
    .state('/contacts/create', {
      url:"/contacts/create",
      templateUrl:"/partials/contacts/create.html",
      controller : 'contactController'
    })
    .state("/dashboard", {
      url: "/dashboard",
      templateUrl: "/partials/dashboard.html"
    })
})
.run(function($rootScope, $location, $http, $window){
    // $http.get('/isLoginedIn')
    // .success(function(res){
    //   if(res.success){
    //     $window.location.href = '/home';
    //   } else {
    //     $location.path('/login');
    //   }
    // })

if($window.location.pathname == '/home'){
  $location.path('/dashboard'); 
}
});