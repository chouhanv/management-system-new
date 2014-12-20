'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  })
  .directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (scope, ele, attrs) {
        scope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(scope);
        });
      }
    };
  })
  .directive("ngFileSelect",function(){
    return {
      link: function($scope,el){
        el.bind("change", function(e){
          $scope.file = (e.srcElement || e.target).files[0];
          console.log($scope.file);
          $scope.getFile($scope.file);
        });
      }

    }
  })

  // .directive('clicable', ['$location', function(location){
  //   return {
  //     link: function(scope, elem, attrs){
  //       elem.bind('click', function(event){
  //         console.log(attrs);
  //         location.url(attrs.href);
  //       });
  //     }
  //   };
  // }])

  // .directive('clicable', function(){
  //   console.log("gdkafgasdfas");
  //   return {
  //     restrict: 'A',
  //     link : function(scope, ele, attrs){
  //       ele.bind('click', function(event){
          
  //       });
  //     }
  //   }
  // })
  .directive('popups', ['ngDialog', function(ngDialog) {

      return{
          restrict: 'A',
          link: function(scope , element, attr){
             element.bind("click", function(e){
                ngDialog.open({
                  template: environment.projectRoot+""+attr.popups,
                  className: 'ngdialog-theme-plain',
                  scope: scope
                });
             });
          }
      }
        // return function(scope, elm, attr){
        //   ngDialog.open({
        //       template: environment.projectRoot+"/app/partials/signup.html",
        //       className: 'ngdialog-theme-plain',
        //       scope: scope
        //     });
        // }
        
    }])
  .directive('nicescroll', function() {
    return function(scope, elm, attr) {
      //elm.niceScroll();
      }
    })
  .directive('datepicker', function() {
    return function(scope, elm, attr) {
      elm.datetimepicker({pickTime: false});
      elm.data("DateTimePicker").setMinDate(new Date());
      // elm.data("DateTimePicker").setMaxDate(new Date("+6d"));
      }
    })
    .directive('timepicker', function(){
      return function(scope, elm, attr) {
        elm.datetimepicker({pickDate: false});
      };
    })
  .directive('ngConfirmClick', [
        function(){
            return {
                priority: 1,
                terminal: true,
                link: function (scope, element, attr) {
                    var msg = attr.ngConfirmClick || "Are you sure want to delete?";
                    var clickAction = attr.ngClick;
                    element.bind('click',function (event) {
                        if ( window.confirm(msg) ) {
                            scope.$eval(clickAction)
                        }
                    });
                }
            };
    }]);


