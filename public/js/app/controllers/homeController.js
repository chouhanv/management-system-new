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
	
});

