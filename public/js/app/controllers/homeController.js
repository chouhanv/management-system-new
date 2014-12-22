'use strict';

/* Controllers */

angular.module('myApp.homeController', [])
.controller('homeController', function( $rootScope, $scope, $window, $location,$http) {

	$rootScope.changePath = function(path){
		$location.path(path);
	}

	$http.get('/getContacts')
    .success(function(data){
    	if (data.success) {
			$rootScope.allContactes = data.contactes;
		}
    })
    .error(function(error){
    	console.log(error);
    });

    $rootScope.getContacts = function(){
    	$http.get('/getContacts')
	    .success(function(data){
	    	if (data.success) {
				$rootScope.allContactes = data.contactes;
			}
	    })
	    .error(function(error){
	    	console.log(error);
	    });
    }

    $rootScope.getContactCategories = function(){
    	$http.post('/getCategorie')
     .success(function(data){
		if (data){
			$scope.categories = data.categorie;
		}
			else {
				$scope.message = "Try Again";
			}
	    })
		.error(function(error){
			console.log(error);
		});
    }

    $scope.pluginClock = function(){
    	function tp_clock_time(){
            var now     = new Date();
            var hour    = now.getHours();
            var minutes = now.getMinutes();                    
            
            hour = hour < 10 ? '0'+hour : hour;
            minutes = minutes < 10 ? '0'+minutes : minutes;
            
            $(".plugin-clock").html(hour+"<span>:</span>"+minutes);
        }
        if($(".plugin-clock").length > 0){
            
            tp_clock_time();
            
            window.setInterval(function(){
                tp_clock_time();                    
            },10000);
            
        }
    }

    $scope.pluginDate = function(){
            
            if($(".plugin-date").length > 0){
                
                var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
                var months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
                        
                var now     = new Date();
                var day     = days[now.getDay()];
                var date    = now.getDate();
                var month   = months[now.getMonth()];
                var year    = now.getFullYear();
                
                $(".plugin-date").html(day+", "+month+" "+date+", "+year);
            }
            
        }

        $rootScope.event_text = "";

        $scope.addEvent = function(event_text){
            console.log(event_text);
            if(event_text != ""){
                $("#external-events").prepend('<a class="list-group-item external-event">'+event_text+'</a>');
                $("#new-event-text").val("");
            }
        }


        $scope.tasks = function(){
        
        $("#add_new_task").on("click",function(){
            var nt = $("#new_task").val();
            if(nt != ''){
                
                var task = '<div class="task-item task-primary">'
                                +'<div class="task-text">'+nt+'</div>'
                                +'<div class="task-footer">'
                                    +'<div class="pull-left"><span class="fa fa-clock-o"></span> now</div>'
                                +'</div>'
                            +'</div>';
                    
                $("#tasks").prepend(task);
            }            
        });
        
        $("#tasks,#tasks_progreess,#tasks_completed").sortable({
            items: "> .task-item",
            connectWith: "#tasks_progreess,#tasks_completed",
            handle: ".task-text",            
            receive: function(event, ui) {
                if(this.id == "tasks_completed"){
                    ui.item.addClass("task-complete").find(".task-footer > .pull-right").remove();
                }
                if(this.id == "tasks_progreess"){
                    ui.item.find(".task-footer").append('<div class="pull-right"><span class="fa fa-play"></span> 00:00</div>');
                }                
                page_content_onresize();
            }
        }).disableSelection();
        
    }
	
});

