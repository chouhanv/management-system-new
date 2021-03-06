'use strict';

/* Controllers */

angular.module('myApp.homeController', [])
.controller('homeController', function($state, $rootScope, $scope, $window, $location,$http) {

	$rootScope.changePath = function(path){
		$location.path(path);
	}

    $rootScope.getContactPath = function(){
        if($rootScope.category && $rootScope.category.categorie)
            $rootScope.changePath('/contacts/'+$rootScope.category.categorie.toLowerCase().replace(/\s/g, ''));
        else 
            $rootScope.changePath('/contacts');
    }

    $state.transitionTo('contacts.client');
    $state.transitionTo('contacts.referrer');
    $state.transitionTo('contacts.attorney');
    $state.transitionTo('contacts.mortgagebroker');
    $state.transitionTo('contacts.lender');
    $state.transitionTo('contacts.loanofficer');
    $state.transitionTo('contacts.titlecompany');
    $state.transitionTo('contacts.pestinspector');
    $state.transitionTo('contacts.surveyor');
    $state.transitionTo('contacts.realestateagent');
    $state.transitionTo('contacts.underwriter');
    $state.transitionTo('contacts.buildinginspector');
    $state.transitionTo('contacts.appraiser');
    $state.transitionTo('contacts.recordingoffice');
    $state.transitionTo('contacts.abstractsearch');
    $state.transitionTo('contacts.closer');
    $state.transitionTo('contacts.investor');
    $state.transitionTo('contacts.other');

    $rootScope.screenlock = false;

    $rootScope.setScreenLock = function(val){
        $rootScope.screenlock = val;
    }

    $rootScope.clim = 100;
    $rootScope.categorie = "";
    $rootScope.start = 0;
    $rootScope.allContactes = [];
    $rootScope.isShowProspectiveClient = {status:false};
    $rootScope.currentPage = 0;

    $rootScope.moreContact = function(page,term){
        $rootScope.currentPage = page;
        if(term == undefined)term == '';
        setTimeout(function(){
            $rootScope.startIndex = $rootScope.clim*page;
            $rootScope.term = term;
            $rootScope.getContacts();
        },10);
    }
    $rootScope.sortContactdata = function(sortdata){
     $rootScope.currentPage = 0;
     $rootScope.sort = sortdata;
     $rootScope.getContacts();
    }

	$http.get('/getContacts?startIndex='+$rootScope.startIndex+'&clim='+$rootScope.clim+"&category="+$rootScope.filterByCatId+"&isProspectiveClient="+$rootScope.isShowProspectiveClient.status+"&term="+$rootScope.term)
    .success(function(data){
    	if(data.success) {
			$rootScope.contactPages = data.totalContact%$rootScope.clim == 0 ? data.totalContact/$rootScope.clim:(1+parseInt(data.totalContact/$rootScope.clim));
            $rootScope.allContactes = data.contactes;
		}
    })
    .error(function(error){
    	console.log(error);
    });

    $rootScope.getTotalContacts = function(){
        $http.get('/getTotalContacts')
        .success(function(data){
            if (data.success) {
                $rootScope.totalContacts = data.contactes;
            }
        })
        .error(function(error){
            console.log(error);
        });
   }

    $rootScope.getTotalContacts();

    $http.get('/getMatters/All')
    .success(function(data){
        if(data.success){
            $rootScope.matters = data.matters;
        } else {
            console.log(data);
        }
    })
    .error(function(error){
        console.log(error);
    });

    //$rootScope.resetCategory = 
    $rootScope.getNumber = function(num) {

        if(num) return new Array(parseInt(num));   
        return [];
    }

    $rootScope.getContacts = function(){
        $rootScope.allContactes = [];
        $rootScope.isLoading = true;
    	$http.get('/getContacts?startIndex='+$rootScope.startIndex+'&clim='+$rootScope.clim+"&categorie="+$rootScope.filterByCatId+"&isShowProspectiveClient="+$rootScope.isShowProspectiveClient.status+"&term="+$rootScope.term+"&sort="+$rootScope.sort)
	    .success(function(data){
	    	if (data.success) {
				//$rootScope.allContactes = data.contactes;
                $rootScope.contactPages = data.totalContact%$rootScope.clim == 0 ? data.totalContact/$rootScope.clim:(1+parseInt(data.totalContact/$rootScope.clim));
                $rootScope.allContactes = data.contactes;
                $rootScope.isLoading = false;
			}
	    })
	    .error(function(error){
	    	console.log(error);
            $rootScope.isLoading = false;
	    });
    }

    $rootScope.getMatters = function(){
        $http.get('/getMatters/All')
        .success(function(data){
            if(data.success){
                $rootScope.matters = data.matters;
            } else {
                console.log(data);
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

    $rootScope.initUser = function(user){
        $rootScope.logedInUser = user;
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
            var system_date  = new Date(date);
            //system_date = new Date(system_date.getTime() + (new Date().getTimezoneOffset()*60*1000));
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

    $rootScope.getFormatedDate1 = function(date){

        var system_date  = new Date(date);
        var curr_date = system_date.getDate();
        var curr_month = system_date.getMonth();
        var curr_year = system_date.getFullYear();

        return (((curr_month+1)>9?curr_month+1:"0"+curr_month)+"/"+((curr_date+1)>9?curr_date+1:"0"+curr_date)+"/"+curr_year);
    }
	
});

