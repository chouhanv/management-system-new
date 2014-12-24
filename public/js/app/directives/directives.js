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
  .directive('stopEvent', function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element.bind('click', function (e) {
                e.stopPropagation();
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
  .directive('hovereffect', function($compile){
    return {
      link: function($scope,el){
        el.bind("mouseover", function(e){
          $(this).find("i").css("display","block");
        });
        el.bind("mouseout", function(e){
          $(this).find("i").css("display","none");
        })
      }
    }
  })
  .directive('calendar', function($compile){
    return {
      link: function($scope,el){
        $('#calendar').fullCalendar({
            header: {
              left: 'prev,next today',
              center: 'title',
              right: 'month,agendaWeek,agendaDay'
            },
            defaultDate: new Date(),
            selectable: true,
            selectHelper: true,
            select: function(start, end) {
              var title = prompt('Event Title:');
              var eventData;
              if (title) {
                eventData = {
                  title: title,
                  start: start,
                  end: end
                };
                $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
              }
              $('#calendar').fullCalendar('unselect');
            },
            editable: true,
            eventLimit: true, // allow "more" link when too many events
            events: []
          });
      }
    }
  })


  .directive('wysiwyg', function ($timeout) {
    return {
        template: '<div>' +             
                    '<style>' +
                    '   .wysiwyg-btn-group-margin{  margin-right:5px; }' +
                    '   .wysiwyg-select{ height:30px;margin-bottom:1px;}' +
                    '   .wysiwyg-colorpicker{ font-family: arial, sans-serif !important;font-size:16px !important; padding:2px 10px !important;}' +
                    '</style>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<button title="Bold" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'bold\')" ng-class="{ active: isBold}"><i class="fa fa-bold"></i></button>' +
                        '<button title="Italic" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'italic\')" ng-class="{ active: isItalic}"><i class="fa fa-italic"></i></button>' +
                        '<button title="Underline" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'underline\')" ng-class="{ active: isUnderlined}"><i class="fa fa-underline"></i></button>' +
                        '<button title="Strikethrough" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'strikethrough\')" ng-class="{ active: isStrikethrough}"><i class="fa fa-strikethrough"></i></button>' +
                        '<button title="Subscript" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'subscript\')" ng-class="{ active: isSubscript}"><i class="fa fa-subscript"></i></button>' +
                        '<button title="Superscript" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'superscript\')" ng-class="{ active: isSuperscript}"><i class="fa fa-superscript"></i></button>' +
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<select tabindex="-1"  unselectable="on" class="form-control wysiwyg-select" ng-model="font" ng-options="f for f in fonts" ng-change="setFont()">' +
                        '</select>' +
                    '</div>' +  
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<select unselectable="on" tabindex="-1" class="form-control wysiwyg-select" ng-model="fontSize" ng-options="f.size for f in fontSizes" ng-change="setFontSize()">' +
                        '</select>' +
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<button title="Font Color" tabindex="-1" colorpicker="rgba" type="button" colorpicker-position="top" class="btn btn-default ng-valid ng-dirty wysiwyg-colorpicker wysiwyg-fontcolor" ng-model="fontColor" ng-change="setFontColor()">A</button>'+  
                        '<button title="Hilite Color" tabindex="-1" colorpicker="rgba" type="button" colorpicker-position="top" class="btn btn-default ng-valid ng-dirty wysiwyg-colorpicker wysiwyg-hiliteColor" ng-model="hiliteColor" ng-change="setHiliteColor()">H</button>'+  
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<button title="Remove Formatting" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'removeFormat\')" ><i class="fa fa-eraser"></i></button>' +
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +   
                        '<button title="Ordered List" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'insertorderedlist\')" ng-class="{ active: isOrderedList}"><i class="fa fa-list-ol"></i></button>' +
                        '<button title="Unordered List" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'insertunorderedlist\')" ng-class="{ active: isUnorderedList}"><i class="fa fa-list-ul"></i></button>' +
                        '<button title="Outdent" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'outdent\')"><i class="fa fa-outdent"></i></button>' +
                        '<button title="Indent" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'indent\')"><i class="fa fa-indent"></i></button>' +
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<button title="Left Justify" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'justifyleft\')" ng-class="{ active: isLeftJustified}"><i class="fa fa-align-left"></i></button>' +
                        '<button title="Center Justify" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'justifycenter\')" ng-class="{ active: isCenterJustified}"><i class="fa fa-align-center"></i></button>' +
                        '<button title="Right Justify" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'justifyright\')" ng-class="{ active: isRightJustified}"><i class="fa fa-align-right"></i></button>' +
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin">' +
                        '<button title="Code" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'formatblock\', \'pre\')"  ng-class="{ active: isPre}"><i class="fa fa-code"></i></button>' +
                        '<button title="Quote" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'formatblock\', \'blockquote\')"  ng-class="{ active: isBlockquote}"><i class="fa fa-quote-right"></i></button>' +
                        '<button title="Paragragh" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'insertParagraph\')"  ng-class="{ active: isParagraph}">P</button>' +
                    '</div>' +
                    '<div class="btn-group btn-group-sm wysiwyg-btn-group-margin" >' +
                        '<button ng-show="!isLink" tabindex="-1" title="Link" type="button" unselectable="on" class="btn btn-default" ng-click="createLink()"><i class="fa fa-link" ></i> </button>' +
                        '<button ng-show="isLink" tabindex="-1" title="Unlink" type="button" unselectable="on" class="btn btn-default" ng-click="format(\'unlink\')"><i class="fa fa-unlink"></i> </button>' +
                        '<button title="Image" tabindex="-1" type="button" unselectable="on" class="btn btn-default" ng-click="insertImage()"><i class="fa fa-picture-o"></i> </button>' +
                        
                    '</div>' +
                    '<div id="{{textareaId}}" style="resize:vertical;height:{{textareaHeight || \'80px\'}}; overflow:auto" contentEditable="true" class="{{textareaClass}} wysiwyg-textarea" rows="{{textareaRows}}" name="{{textareaName}}" required="{{textareaRequired}}" placeholder="{{textareaPlaceholder}}" ng-model="value"></div>' +
                '</div>',
        restrict: 'E',
        scope:{
            value: '=ngModel',
            textareaHeight: '@textareaHeight',
            textareaName: '@textareaName',
            textareaPlaceholder: '@textareaPlaceholder',
            textareaClass: '@textareaClass',
            textareaRequired: '@textareaRequired',
            textareaId: '@textareaId',
        },
        replace: true,
        require: 'ngModel',
        link: function (scope, element, attrs, ngModelController) {
            
            var textarea = element.find('div.wysiwyg-textarea');
     
        scope.fonts = [
                'Georgia',
                'Palatino Linotype',
                'Times New Roman',
                'Arial', 
                'Helvetica',
                'Arial Black',
                'Comic Sans MS',
                'Impact',
                'Lucida Sans Unicode',
                'Tahoma',
                'Trebuchet MS',
                'Verdana',
                'Courier New',
                'Lucida Console',
                'Helvetica Neue'
            ].sort();
            scope.font = scope.fonts[6];
          
            scope.fontSizes =  [
                {
                    value:'1',
                    size:'10px'
                },
                {
                    value:'2',
                    size:'13px'
                },
                {
                    value:'3',
                    size:'16px'
                },
                {
                    value:'4',
                    size:'18px'
                },
                {
                    value:'5',
                    size:'24px'
                },
                {
                    value:'6',
                    size:'32px'
                },
                {
                    value:'7',
                    size:'48px'
                }
            ];
            scope.fontSize = scope.fontSizes[1];    
            if (attrs.enableBootstrapTitle === "true" && attrs.enableBootstrapTitle !== undefined)
                //element.find('button[title]').tooltip({container: 'body'})
            textarea.on('keyup mouseup', function () {
                scope.$apply(function readViewText() {
                    var html = textarea.html();
                    if (html == '<br>') {
                        html = '';
                    }
                    ngModelController.$setViewValue(html);
                });
            }); 
            scope.isLink = false;
            //Used to detect things like A tags and others that dont work with cmdValue().
            function itemIs(tag){
                var selection = window.getSelection().getRangeAt(0);
                if(selection){
                    if (selection.startContainer.parentNode.tagName === tag.toUpperCase() || selection.endContainer.parentNode.tagName === tag.toUpperCase()) {
                        return true;
                    } else { return false; }
                } else { return false; }
            }
            //Used to detect things like A tags and others that dont work with cmdValue().
            function getHiliteColor(){
                var selection = window.getSelection().getRangeAt(0);
                if(selection){
                    var style = $(selection.startContainer.parentNode).attr('style');
                    if (!angular.isDefined(style))
                        return false;
                    
                    var a = style.split(';');
                    for (var i=0; i<a.length;i++){
                        var s = a[i].split(':');
                        if (s[0] === 'background-color')
                            return s[1];
                    }
                    return '#fff';
                } else 
                { 
                    return '#fff'; 
                }
            }
            textarea.on('click keyup focus mouseup', function(){
                $timeout(function(){
                    scope.isBold = scope.cmdState('bold');
                    scope.isUnderlined = scope.cmdState('underline');
                    scope.isStrikethrough = scope.cmdState('strikethrough');
                    scope.isItalic = scope.cmdState('italic');
                    scope.isSuperscript = itemIs('SUP');//scope.cmdState('superscript');
                    scope.isSubscript = itemIs('SUB');//scope.cmdState('subscript');    
                    scope.isRightJustified = scope.cmdState('justifyright');
                    scope.isLeftJustified = scope.cmdState('justifyleft');
                    scope.isCenterJustified = scope.cmdState('justifycenter'); 
                    scope.isPre = scope.cmdValue('formatblock') == "pre";
                    scope.isBlockquote = scope.cmdValue('formatblock') == "blockquote";
                    
                    scope.isOrderedList = scope.cmdState('insertorderedlist');
                    scope.isUnorderedList = scope.cmdState('insertunorderedlist');
                    scope.fonts.forEach(function(v,k){ //works but kinda crappy.
                        if (scope.cmdValue('fontname').indexOf(v) > -1){
                            scope.font = v;
                            return false;
                        }
                    });
                    scope.fontSizes.forEach(function(v, k){
                        if (scope.cmdValue('fontsize') === v.value){
                            scope.fontSize = v;
                            return false;
                        }
                    })
                    scope.hiliteColor = getHiliteColor();
                    element.find('button.wysiwyg-hiliteColor').css("background-color", scope.hiliteColor);
                    
                    scope.fontColor = scope.cmdValue('forecolor');
                    element.find('button.wysiwyg-fontcolor').css("color", scope.fontColor);
                    scope.isLink = itemIs('A');
                }, 10);
            });
            // model -> view
            ngModelController.$render = function () {
                textarea.html(ngModelController.$viewValue);
            };
            scope.format = function(cmd, arg){
                document.execCommand(cmd, false, arg);
            }
            scope.cmdState = function(cmd, id) {
                return document.queryCommandState(cmd);
            }
            scope.cmdValue = function(cmd){
                return document.queryCommandValue(cmd);
            }
            scope.createLink = function(){
                var input = prompt('Enter the link URL');
                if (input && input !== undefined)
                    scope.format('createlink', input);
            }
            scope.insertImage = function(){
                var input = prompt('Enter the image URL');
                if (input && input !== undefined)
                    scope.format('insertimage', input);
            }
            scope.setFont = function(){
                scope.format('fontname', scope.font)
            }
            scope.setFontSize = function(){
                scope.format('fontsize', scope.fontSize.value)
            }
            
            scope.setFontColor = function(){
                scope.format('forecolor', scope.fontColor)
            }
            scope.setHiliteColor = function(){
                scope.format('hiliteColor', scope.hiliteColor)
            }
            scope.format('enableobjectresizing', true);
        }
    };
})

  .directive('texteditor', function(){
      return {
        require: 'ngModel',
        link:function($scope, el, attrs, ngModel){
          var $el = $(el);
          setTimeout(function(){
          var $el = $(el);
           $el.summernote({height: 150,
               codemirror: {
                  mode: 'text/html',
                  htmlMode: true,
                  lineNumbers: true,
                  theme: 'default'
                }
            });
          $el.bind('keyup', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            scope.$apply();
          });
        }, 10);
        }
      }
  })

  .directive('ngSelect', function(){
    // return {
    //   require: 'ngModel',
    //   link: function (scope, ele, attrs, ngModel) {
    //    //  ele.bind("click", function() {
    //    //  //this will make all your select elements use bootstrap-select
    //    //  console.log("dasdasda");
        
    //    // });
    //   setTimeout(function(){
    //       $(".select").selectpicker({});
    //       var $ele = $(ele);
    //       $ele.on('change', function (ee, aa) {
    //         ngModel.$setViewValue($ele.val());
    //         scope.$apply();
    //       });
    //   },100);
    //   }
      
    //   }

    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        setTimeout(function(){
          var $el = $(element);
          $el.selectpicker();
          $el.on('change', function (ee, aa) {
            ngModel.$setViewValue($el.val());
            scope.$apply();
          });
        }, 10);
      }
    }
    
  })
  .directive("ngFileSelect",function(){
    return {
      link: function($scope,el){
        el.bind("change", function(e){
          $scope.file = (e.srcElement || e.target).files[0];
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
    return  {
      require: 'ngModel',
      link: function(scope, elm, attr, ngModel){
        var elm = $(elm);
        elm.datepicker();
       //elm.data("DateTimePicker").setMinDate(new Date());
        // elm.data("DateTimePicker").setMaxDate(new Date("+6d"));
        elm.on('change', function (ee, aa) {
            ngModel.$setViewValue(elm.val());
            scope.$apply();
        });
      }
    }
  })
  .directive('timepicker', function(){
    return {
      require: 'ngModel',
      link : function(scope, elm, attr, ngModel){
        var elm = $(elm);
        elm.timepicker();
        elm.on('change', function (ee, aa) {
          ngModel.$setViewValue(elm.val());
          scope.$apply();
        });
      }
    };
  })
  .directive('icheck', function(){
    return {
      require: 'ngModel',
      link : function(scope, elm, attr, ngModel){
        setTimeout(function(){
          var elm = $(elm);
          elm.iCheck({checkboxClass: 'icheckbox_minimal-grey',radioClass: 'iradio_minimal-grey'});
          elm.on('change click', function (ee, aa) {
            console.log("dasda");
            ngModel.$setViewValue(elm.val());
            scope.$apply();
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


