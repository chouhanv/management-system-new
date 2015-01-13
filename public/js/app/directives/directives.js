'use strict';

/* Directives */


angular.module('myApp.directives', [])
  .directive('dynamic', function ($compile) {
    return {
      restrict: 'A',
      replace: true,
      link: function (rootScope, ele, attrs) {
        rootScope.$watch(attrs.dynamic, function(html) {
          ele.html(html);
          $compile(ele.contents())(rootScope);
        });
      }
    };
  })
  .directive('getcontactname', function($compile){
    return {
      restrict: 'A',
      replace: true,
      link: function (rootScope, ele, attrs) {
        rootScope.$watch(attrs.getcontactname, function(id) {
          if(id && id != null && id != undefined){
            angular.forEach(rootScope.allContactes, function(val,i){
              if(val._id == id){
                $(ele).html("<b>"+val.name.firstname + " " + val.name.lastname+"</b>");
              }
            });
          } else {
            $(ele).html("<b>Not Selected</b>");
          }
        });
      }
    };
  })
  .directive('userimage', function($compile){
    return {
      restrict: 'A',
      replace: true,
      link: function (rootScope, ele, attrs) {
        rootScope.$watch(attrs.userimage, function(id) {
          angular.forEach(rootScope.adminUsers, function(val,i){
            if(val._id == id){
              if(val.imageSrc)
                $(ele).attr("src",val.imageSrc);
              else
                $(ele).attr("src","/assets/images/users/User_Avatar_Gray.png");
            }
          });
        });
      }
    };
  })
  .directive('customscroll', function($compile){
    return {
      link:function(scope, element, attrs){
        console.log("scroll......");
        var $el = $(element);
        $el.mCustomScrollbar(
          {axis:"y", autoHideScrollbar: true, scrollInertia: 20, advanced: {autoScrollOnFocus: false}}
          );
      }
    }
  })
  .directive('calenderedit', function ($compile) {
    // return {
    //   link: function (rootScope, ele, attrs) {
    //     console.log(attrs);
    //     rootScope.$watch(attrs.dynamic, function(html) {
    //       // ele.html(html);
    //       // $compile(ele.contents())(rootScope);
    //     });
    //   }
    // };

    return {
        restrict: 'A',
        scope: {
          showApp: '@',
          ngxOnshow: '&'
        },
        rootScope: {
          showApp: '@',
          ngxOnshow: '&'
        },
        link: function (scope, element, attrs) {
          attrs.$observe('showApp', function (newValue) {
            newValue === "true" && scope.ngxOnshow()
          })
        }
      };

  })
  .directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (rootScope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
            });
        }
    };
 })
  .directive('hovereffect', function($compile){
    return {
      link: function($rootScope,el){
        el.bind("mouseover", function(e){
          $(this).find("i").css("visibility","visible");
        });
        el.bind("mouseout", function(e){
          $(this).find("i").css("visibility","hidden");
        })
      }
    }
  })
  .directive("hovereffectactivity", function($compile){
    return {
      link: function($rootScope,el){
        var $el = $(el);
        $el.parent().parent().bind("mouseover", function(e){
          $(this).find("i").css("visibility","visible");
        });
        $el.parent().parent().bind("mouseout", function(e){
          $(this).find("i").css("visibility","hidden");
        })
      }
    }
  })
  .directive("showeditlink", function($compile){
    return {
        link:function($rootScope, el, attr){
            el.bind('mouseover', function(e){
                $(this).find("a").css("display","block");
            });
            el.bind("mouseout", function(e){
                $(this).find("a").css("display", "none");
            })
        }
    }
  })
  // .directive('calendar', function($compile, $http){
  //   return {
  //     link: function($rootScope,el){
  //       $http.get('/getSchedules')
  //       .success(function(data){
  //           $('#calendar').fullCalendar({
  //               header: {
  //                 left: 'prev,next today',
  //                 center: 'title',
  //                 right: 'month,agendaWeek,agendaDay'
  //               },
  //               eventClick: function(event, element) {
  //                   //console.log(event, element);
  //                   // event.title = "CLICKED!";
  //                   // $('#calendar').fullCalendar('updateEvent', event);
  //                   $rootScope.newSchedule.title = event.title;
  //                   $rootScope.newSchedule.start = event.start;
  //                   $rootScope.newSchedule.end = event.end;
  //                   $rootScope.newSchedule._id = event._id;
  //                   $rootScope.isEditSchedule = false;
                    
                    
  //                   $(".modal_calender_edit").click();
  //                   $('.modal-backdrop').css('background','none');
  //                   setTimeout(function(){
  //                       $('.modal-content').attr("style","border-radius:none;border-width:0px !important; box-shadow:0px 0px 3px #000000")
                    
  //                   },1);

  //               },
  //               defaultDate: new Date(),
  //               selectable: true,
  //               selectHelper: true,
  //               select: function(start, end) {

  //                   $(".modal_calender").click();
  //                   $('.modal-backdrop').css('background','none');
  //                   setTimeout(function(){
                    
  //                       $('.modal-content').attr("style","border-radius:none;border-width:0px !important; box-shadow:0px 0px 3px #000000")
  //                   },1);
  //                 //var title = prompt('Event Title:');
  //                 $rootScope.newSchedule.start = start._d;
  //                 console.log($rootScope.newSchedule.start);
  //                 $rootScope.newSchedule.end = end;
  //                 $rootScope.newSchedule.title = "";
  //                 console.log($rootScope.newSchedule);
  //                 $rootScope.$apply();
  //               },
  //               editable: true,
  //               eventLimit: true, // allow "more" link when too many events
  //               events: data.schedules
  //           });
  //       })
  //       .error(function(data){
  //           console.log(data);
  //       });
  //     }
  //   }
  // })

// .directive('newSchedule', function($compile){
//     console.log("fsdfds");
//     return {
//         link:function(rootScope, el, attrs){
//             var $el = $(el);
//             setTimeout(function(){
//                 console.log("from here");
//                 $('.modal-backdrop').remove();
//             }, 1000);
//         }
//     }
// })
  .directive('texteditor', function(){
      return {
        require: 'ngModel',
        link:function(rootScope, el, attrs, ngModel){
          var $el = $(el);
          $el.summernote({height: 150,
               codemirror: {
                  mode: 'text/html',
                  htmlMode: true,
                  lineNumbers: true,
                  theme: 'default'
                }
            });
          setTimeout(function(){
            $(".note-editable").on('keyup change focus mouseout mouseover', function(e){
                rootScope.new_activity.remark = $(this).html();
                rootScope.$apply();
            }); 
          $el.bind('keypress', function (ee, aa) {
            console.log("fasdf");
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        }, 10);
        }
      }
  })

  .directive('texteditorremark', function(){
      return {
        link:function(rootScope, el, attrs, ngModel){
          var $el = $(el);
          $el.summernote({height: 150,
               codemirror: {
                  mode: 'text/html',
                  htmlMode: true,
                  lineNumbers: true,
                  theme: 'default'
                }
            });
          setTimeout(function(){
            $(".remark-editor .note-editable").html(rootScope.remarkShow);
        }, 10);
        }
      }
  })

  .directive('ngSelect', function(){
    // return {
    //   require: 'ngModel',
    //   link: function (rootScope, ele, attrs, ngModel) {
    //    //  ele.bind("click", function() {
    //    //  //this will make all your select elements use bootstrap-select
    //    //  console.log("dasdasda");
        
    //    // });
    //   setTimeout(function(){
    //       $(".select").selectpicker({});
    //       var $ele = $(ele);
    //       $ele.on('change', function (ee, aa) {
    //         ngModel.$setViewValue($ele.val());
    //         rootScope.$apply();
    //       });
    //   },100);
    //   }
      
    //   }

    return {
      require: 'ngModel',
      link: function (rootScope, element, attrs, ngModel) {
        setTimeout(function(){
          var $el = $(element);
          $el.selectpicker();
          $el.on('change', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        }, 10);
      }
    }
    
  })
  .directive("ngFileSelect",function(){
    return {
      link: function($rootScope,el){
        el.bind("change", function(e){
          $rootScope.file = (e.srcElement || e.target).files[0];
          $rootScope.getFile($rootScope.file);
        });
      }

    }
  })
  .directive("ngUserFileSelect",function(){
    return {
      link: function($rootScope,el){
        el.bind("change", function(e){
          $rootScope.file = (e.srcElement || e.target).files[0];
          $rootScope.getUserFile($rootScope.file);
        });
      }

    }
  })

  // .directive('clicable', ['$location', function(location){
  //   return {
  //     link: function(rootScope, elem, attrs){
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
  //     link : function(rootScope, ele, attrs){
  //       ele.bind('click', function(event){
          
  //       });
  //     }
  //   }
  // })
  .directive('popups', ['ngDialog', function(ngDialog) {

      return{
          restrict: 'A',
          link: function(rootScope , element, attr){
             element.bind("click", function(e){
                ngDialog.open({
                  template: environment.projectRoot+""+attr.popups,
                  className: 'ngdialog-theme-plain',
                  rootScope: rootScope
                });
             });
          }
      }
        // return function(rootScope, elm, attr){
        //   ngDialog.open({
        //       template: environment.projectRoot+"/app/partials/signup.html",
        //       className: 'ngdialog-theme-plain',
        //       rootScope: rootScope
        //     });
        // }
        
    }])
  .directive('nicescroll', function() {
    return function(rootScope, elm, attr) {
      //elm.niceScroll();
      }
    })
  .directive('datepicker', function() {
    return  {
      require: 'ngModel',
      link: function(rootScope, elm, attr, ngModel){
        var elm = $(elm);
        elm.datepicker({useCurrent: true});
       //elm.data("DateTimePicker").setMinDate(new Date());
        // elm.data("DateTimePicker").setMaxDate(new Date("+6d"));
        elm.on('change', function (ee, aa) {
            ngModel.$setViewValue(elm.val());
            rootScope.$apply();
        });
      }
    }
  })
  .directive("datetimepicker", function(){
    return {
      require: 'ngModel',
      link : function(rootScope, elm, attr, ngModel){
        var elm = $(elm);
        elm.datetimepicker({useCurrent: true});
        $(".bootstrap-datetimepicker-widget").attr("style","z-index:9999");
       //elm.data("DateTimePicker").setMinDate(new Date());
        // elm.data("DateTimePicker").setMaxDate(new Date("+6d"));
        elm.on('change', function (ee, aa) {
            ngModel.$setViewValue(elm.val());
            rootScope.$apply();
        });
      }
    };
  })
  .directive('timepicker', function(){
    return {
      require: 'ngModel',
      link : function(rootScope, elm, attr, ngModel){
        var elm = $(elm);
        elm.datetimepicker({pickDate : false,useCurrent: true});
        $(".bootstrap-datetimepicker-widget").attr("style","z-index:9999");
       //elm.data("DateTimePicker").setMinDate(new Date());
        // elm.data("DateTimePicker").setMaxDate(new Date("+6d"));
        elm.on('change', function (ee, aa) {
            ngModel.$setViewValue(elm.val());
            rootScope.$apply();
        });
      }
    };
  })
  .directive('icheck', function(){
    return {
      require: 'ngModel',
      link : function(rootScope, elm, attr, ngModel){
        setTimeout(function(){
          var elm = $(elm);
          elm.iCheck({checkboxClass: 'icheckbox_minimal-grey',radioClass: 'iradio_minimal-grey'});
          elm.on('change click', function (ee, aa) {
            console.log("dasda");
            ngModel.$setViewValue(elm.val());
            rootScope.$apply();
          });
        },20);
      }
    };
  })
  .directive('ngConfirmClick', [
    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (rootScope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure want to delete?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if ( window.confirm(msg) ) {
                        rootScope.$eval(clickAction)
                    }
                });
            }
        };
    }]);


