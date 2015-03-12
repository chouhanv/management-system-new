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
  .directive('focusout', function(){
    return {
      link : function(rootScope, ele, attr){
        $(ele).bind("focusout", function(){
          $(ele).parent().find('.editordiv').css('display','none').focus();
          $(ele).parent().find('.textdiv').css('display','block');
          rootScope.updateMatter();
        });
        $(ele).bind("keyup", function(){
          rootScope.updateMatter();
        });
      }
    }
  })
  .directive('tinymce', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs, ngModel){
        tinymce.init({
            selector: ".editablenote",
            inline: true,
            plugins: "save",
            toolbar: "save | insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image",
            ave_enablewhendirty: true,
            save_onsavecallback: function() {
              ngModel.$setViewValue($(ele).html());
              rootScope.$apply();
              rootScope.updateMatter();
            },
            blur:function(){
              ngModel.$setViewValue($(ele).html());
              rootScope.$apply();
              rootScope.updateMatter();
            }
        });
      }
    }
  })
  .directive('whenScrolled', function() {
    return function(scope, elm, attr) {
        var raw = elm[0];
        elm.bind('scroll', function() {
            if (raw.scrollTop + raw.offsetHeight >= raw.scrollHeight) {
                //scope.$apply(attr.whenScrolled);
            }
        });
    };
  })
  .directive('showmorecontact', function(){
    return {
      link:function(rootScope, elm, attrs){
        $(elm).scroll(function(){
          if($(window).scrollTop() >= $(document).height() - $(window).height() - 100){
            // run our call for pagination
            // var pId = $('#showMore').attr('rel');
            // currPageNo = parseInt(pId);
            // setPageNumbers();
          }
        });
      }
    }
  })
  .directive('lockscreenbox', function(){
    return {
      link:function(rootScope, ele, attrs){
        $(".lockscreen-box .lsb-access").on("click",function(){
            $(this).parent(".lockscreen-box").addClass("active").find("input").focus(); 
            return false;
        });
        $(".lockscreen-box .user_signin").on("click",function(){        
            $(".sign-in").show();
            $(this).remove();
            $(".user").hide().find("img").attr("src","assets/images/users/no-image.jpg");
            $(".user").show();
            return false;
        });
      }
    }
  })
  .directive('hoverremovephone', function(){
    return {
      link:function(rootScope, ele, attrs){
        var $ele = $(ele);
        $ele.bind('mouseover', function(evt){
          $(this).find('i').css('display','inline-block');
        });
        $ele.bind('mouseout', function(evt){
          $(this).find('i').css('display','none');
        })
      }
    }
  })
  .directive('maskcell', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('(999) 999-9999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive('maskhome', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('(999) 999-9999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive('maskwork', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('(999) 999-9999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive('maskfax', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('(999) 999-9999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive('maskphone', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('(999) 999-9999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive('maskip', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('(999) 999-9999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive('maskextension', function(){
    return {
      require: 'ngModel',
      link:function(rootScope, ele, attrs,ngModel){
        $(ele).mask('x99999');
        setTimeout(function(){
          var $el = $(ele);
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            rootScope.$apply();
          });
        },100);
      }
    }
  })
  .directive("activecontacttab", function(){
    return {
      link:function(rootScope, ele, attrs){
        var $ele = $(ele);
        $('.contact-dtl').click();
      }
    }
  })
  .directive("savecontactform", function(){
    return {
      link:function(rootScope, ele, attrs){
        var $ele = $(ele);
        $ele.bind('click', function(e){
          $("#savecontactform").click();
          rootScope.discardContact(rootScope.editFormIndex);
          rootScope.getTotalContacts();
        });
      }
    }
  })
  .directive('getcontactname', function($compile){
    return {
      restrict: 'A',
      replace: true,
      link: function (rootScope, ele, attrs) {
        rootScope.$watch(attrs.getcontactname, function(id) {
          if(id && id != null && id != undefined){
            angular.forEach(rootScope.totalContacts, function(val,i){
              // if(val._id == id){
              //   if(val.category_id.categorie == "Lender" || val.category_id.categorie == "Recording Office"){
              //     $(ele).html("<b>"+val.company.companyname+"</b>");
              //   } else {
              //     $(ele).html("<b>"+val.name.firstname + " " + val.name.lastname+"</b>");
              //   }
              // }

              angular.forEach(val, function(v,j){
                if(v._id == id) $(ele).html(v.displayname);
              })

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
  .directive('username', function($compile){
    return {
      replace: true,
      link: function (rootScope, ele, attrs) {
        rootScope.$watch(attrs.username, function(id) {
          angular.forEach(rootScope.adminUsers, function(val,i){
            if(val._id == id){
              if(val.first_name)
                $(ele).html(val.first_name);
              else
                $(ele).html("");
            }
          });
        });
      }
    };
  })
  .directive('customscroll', function($compile){
    return {
      link:function(scope, element, attrs){
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
          $el.parent().find('.dropdown-menu').attr("style","max-height:200px");
          $el.parent().find('.dropdown-menu').attr("customscroll","");
        }, 1000);
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
        elm.datetimepicker({useCurrent: true, pickTime:false});
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
        elm.datetimepicker({useCurrent: true, pickDate : false});
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
            ngModel.$setViewValue(elm.val());
            rootScope.$apply();
          });
        },20);
      }
    };
  })
  .directive('ngConfirmClick',
    function(){
        return {
            priority: 1,
            terminal: true,
            link: function (rootScope, element, attr) {
                var msg = attr.ngConfirmClick || "Are you sure want to delete?";
                var clickAction = attr.ngClick;
                element.bind('click',function (event) {
                    if (window.confirm(msg) ) {
                        rootScope.$eval(clickAction)
                    }
                });
            }
        };
    });


