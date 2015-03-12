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
  'myApp.contactController',
  'myApp.matterController',
  'myApp.ScheduleAndTaskController',
  'myApp.usersController',
  'textAngular'
]);
myApp.config(function($stateProvider, $urlRouterProvider) {
	$stateProvider
    // .state('/login', {
    //   url: "/login",
    //   templateUrl: "/app/partials/login.html",
    // })
    // .state('', {
    //   url: "/",
    //   templateUrl: "/app/partials/login.html",
    // })
    // .state('/contacts', {
    //   url:"/contacts/list",
    //   templateUrl:"/partials/contacts/list.html"
    // })
    .state('contacts', {
        url: '/contacts',

        // Note: abstract still needs a ui-view for its children to populate.
        // You can simply add it inline here.
        templateUrl: '/partials/contacts/list.html'
    })
    .state('contacts.client', {
        // url will become '/contacts/list'
        url: '/client',
        templateUrl: '/partials/contacts/client.html'
    })
    .state('contacts.referrer', {
        url: '/referrer',
        templateUrl: '/partials/contacts/referrer.html'
    })
    .state('contacts.attorney', {
        url: '/attorney',
        templateUrl: '/partials/contacts/attorney.html'
    })
    .state('contacts.mortgagebroker', {
        url: '/mortgagebroker',
        templateUrl: '/partials/contacts/mortgagebroker.html'
    })
    .state('contacts.lender', {
        url: '/lender',
        templateUrl: '/partials/contacts/lender.html'
    })
    .state('contacts.loanofficer', {
        url: '/loanofficer',
        templateUrl: '/partials/contacts/loanofficer.html'
    })
    .state('contacts.titlecompany', {
        url: '/titlecompany',
        templateUrl: '/partials/contacts/titlecompany.html'
    })
    .state('contacts.pestinspector', {
        url: '/pestinspector',
        templateUrl: '/partials/contacts/pestinspector.html'
    })
    .state('contacts.surveyor', {
        url: '/surveyor',
        templateUrl: '/partials/contacts/surveyor.html'
    })
    .state('contacts.realestateagent', {
        url: '/realestateagent',
        templateUrl: '/partials/contacts/realestateagent.html'
    })
    .state('contacts.underwriter', {
        url: '/underwriter',
        templateUrl: '/partials/contacts/underwriter.html'
    })
    .state('contacts.buildinginspector', {
        url: '/buildinginspector',
        templateUrl: '/partials/contacts/buildinginspector.html'
    })
    .state('contacts.appraiser', {
        url: '/appraiser',
        templateUrl: '/partials/contacts/appraiser.html'
    })
    .state('contacts.recordingoffice', {
        url: '/recordingoffice',
        templateUrl: '/partials/contacts/recordingoffice.html'
    })
    .state('contacts.closer', {
        url: '/closer',
        templateUrl: '/partials/contacts/closer.html'
    })
    .state('contacts.abstractsearch', {
        url: '/abstractsearch',
        templateUrl: '/partials/contacts/abstractsearch.html'
    })
    .state('contacts.investor', {
        url: '/investor',
        templateUrl: '/partials/contacts/investor.html'
    })
    .state('contacts.other', {
        url: '/other',
        templateUrl: '/partials/contacts/other.html'
    })
    
    .state('/contacts/create', {
      url:"/contacts/create",
      templateUrl:"/partials/contacts/create.html"
    })
    .state("/dashboard", {
      url: "/dashboard",
      templateUrl: "/partials/dashboard.html"
    })
    .state("/schedule", {
      url: "/schedule",
      templateUrl: "/partials/schedule/calendar.html"
    })
    .state("/tagsks", {
      url: "/tasks",
      templateUrl: "/partials/tasks/task.html"
    })
    .state("/matters/new", {
      url: "/matters/new",
      templateUrl: "/partials/matters/new.html"
    })
    .state("/superadmin/users", {
      url:"/superadmin/users",
      templateUrl:"/partials/superadmin/users.html",
      controller : "usersController"
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