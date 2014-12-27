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

        $rootScope.convertTime = function(date){
        var system_date  = Date.parse(date);;
        var user_date = new Date();
        var diff = Math.floor((user_date - system_date) / 1000);
        if (diff <= 1) {return "just now";}
        if (diff < 20) {return diff + " seconds ago";}
        if (diff < 40) {return "half a minute ago";}
        if (diff < 60) {return "less than a minute ago";}
        if (diff <= 90) {return "one minute ago";}
        if (diff <= 3540) {return Math.round(diff / 60) + " minutes ago";}
        if (diff <= 5400) {return "1 hour ago";}
        if (diff <= 86400) {return Math.round(diff / 3600) + " hours ago";}
        if (diff <= 129600) {return "1 day ago";}
        if (diff < 604800) {return Math.round(diff / 86400) + " days ago";}
        if (diff <= 777600) {return "1 week ago";}
        return "on " + date.split("T")[0];
      };

     $rootScope.getTimeFromDate = function(date){
        var system_date  = new Date(date.toLocaleString());
        var h = system_date.getHours();
        var m = system_date.getMinutes();
        return h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM");
     }

     $rootScope.getDateAndTime = function(date){
        if(date){

            var system_date  = new Date(date.toString());
            var h = system_date.getHours();
            var m = system_date.getMinutes();

            var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");

            var curr_date = system_date.getDate();
            var curr_month = system_date.getMonth();
            var curr_year = system_date.getFullYear();
            
            return (m_names[curr_month]  + " " + curr_date + ", " +  curr_year) + " " + (h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM"));

        } else {
            var d = new Date();
            var h = d.getHours();
            var m = d.getMinutes();
            var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
            var curr_date = d.getDate();
            var curr_month = d.getMonth();
            var curr_year = d.getFullYear();
            
            return (m_names[curr_month]  + " " + curr_date + ", " +  curr_year) + " " + (h > 12 ? (h-12 + ":" + (m > 9 ? m : 0+""+m) + " PM"):(h + ":" + (m > 9 ? m : 0+""+m) + " AM"));
        }
     }


     $rootScope.getFormatedDate = function(date){

        var system_date  = new Date(date);
        var m_names = new Array("January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December");
        var curr_date = system_date.getDate();
        var curr_month = system_date.getMonth();
        var curr_year = system_date.getFullYear();

        return (curr_date+"-"+m_names[curr_month]+"-"+curr_year);

     }
	
});

