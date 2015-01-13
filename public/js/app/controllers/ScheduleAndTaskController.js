angular.module('myApp.ScheduleAndTaskController', [])
.controller('ScheduleAndTaskController', function( $rootScope, $scope, $window, $location,$http) {

	$rootScope.newSchedule = {};
	$rootScope.isEditSchedule = false;
	$rootScope.editedScheduleEvent = {};

    
    function notyConfirm(schedule){
    	noty({
            text: schedule.title,
            layout: 'topRight',
            buttons: [
                    {addClass: 'btn btn-success btn-clean', text: 'Ok', onClick: function($noty) {
                        $noty.close();
                        $http.post('/ignoreScheudle', {id:schedule._id})
                        .success(function(data){
                            if(data.success){
                            	angular.forEach($rootScope.schedules, function(data, i){
                            	    if(data._id == schedule._id){
                            	    }
                                });
                                 //noty({text: 'Schedule Has been ignored.', layout: 'topRight', type: 'success'});
                            } else {
                            	console.log(data);
                            }
                        })
                        .error(function(error){
                        	console.log(error);
                        })
                    }
                    },
                    {addClass: 'btn btn-info btn-clean', text: 'Remember Again', onClick: function($noty) {
                        $noty.close();
                        setTimeout(function(){notyConfirm(schedule);},300000);
                        }
                    }
                ]
        });                                                    
    }  

	function checkSchedule(){
	  	for(var x = 0; x < $rootScope.schedules.length; x++){
	  		if($rootScope.getDateAndTime($rootScope.schedules[x].start) <= $rootScope.getDateAndTime() && !$rootScope.schedules[x].is_ignored){
	  			$rootScope.schedules[x].is_ignored = true;
	  			notyConfirm($rootScope.schedules[x]);
	  		}
	  	}
	  	setTimeout(function(){checkSchedule();},60000);
	}

	$rootScope.getSchedules = function(){
		$http.get('/getSchedules')
        .success(function(data){
        	$rootScope.schedules = data.schedules;
        	checkSchedule();
            $('#calendar').fullCalendar({
                header: {
                  left: 'prev,next today',
                  center: 'title',
                  right: 'month,agendaWeek,agendaDay'
                },
                eventClick: function(event, element) {
                    
                    // $rootScope.newSchedule.title = event.title;
                    // $rootScope.newSchedule.start = event.start;
                    // $rootScope.newSchedule.end = event.end;
                    // $rootScope.newSchedule._id = event._id;

                    $rootScope.newSchedule = event;
                    
                	$rootScope.isEditSchedule = false;

                    $rootScope.$apply();
                    
                    $(".modal_calender_edit").click();
                    $('.modal-backdrop').css('background','none');
                    setTimeout(function(){
                        $('.modal-content').attr("style","border-radius:none;border-width:0px !important; box-shadow:0px 0px 3px #000000")
                    
                    },1);

                },
                defaultDate: new Date(),
                timezone : 'local',
                selectable: true,
                selectHelper: true,
                select: function(start, end) {

                    $(".modal_calender").click();
                    $('.modal-backdrop').css('background','none');
                    setTimeout(function(){
                    
                        $('.modal-content').attr("style","border-radius:none;border-width:0px !important; box-shadow:0px 0px 3px #000000")
                    },1);
                  //var title = prompt('Event Title:');
                  $rootScope.newSchedule.start = start;
                  $rootScope.newSchedule.end = end;
                  $rootScope.newSchedule.title = "";
                  $rootScope.newSchedule.is_ignored = false;
                  $rootScope.$apply();
                  $('#calendar').fullCalendar('unselect');
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events: $rootScope.schedules
            });
        })
        .error(function(data){
            console.log(data);
        });
	}

	$rootScope.saveSchedule = function(){
		$http.post('/saveSchedule', {
						_id:$rootScope.newSchedule._id,
						end:$rootScope.newSchedule.end,
						start:$rootScope.newSchedule.start,
						title:$rootScope.newSchedule.title,
						is_ignored:false
					})
		.success(function(data){
			if(data.success){
				if($rootScope.newSchedule._id){
					angular.forEach($rootScope.schedules, function(val, i){
						if(val._id == $rootScope.newSchedule._id){
							$rootScope.schedules[i].is_ignored = false;
						}
					});
					$('#calendar').fullCalendar('updateEvent', $rootScope.newSchedule);
				}
				else {
					$rootScope.schedules.push(data.schedule);
					$('#calendar').fullCalendar('renderEvent', data.schedule, true);
				}
				$('#calendar').fullCalendar('unselect');
			} else {
				alert("Please try again");
			}
		})	
		.error(function(data){
			console.log(data);
		});
	}

	$rootScope.deleteSchedule = function(){
		$http.post('/deleteSchedule', {id:$rootScope.newSchedule._id})
		.success(function(data){
			if(data.success){
				$('#calendar').fullCalendar( 'removeEvents', $rootScope.newSchedule._id);
			} else {
				alert("Please try again");
			}
		})
		.error(function(error){
			console.log(error);
		});
	}

	$rootScope.alert = function(){
	  alert('alerted!');
	};

	$rootScope.editSchedule = function(){
		$rootScope.isEditSchedule=true;
	}

	$rootScope.getSchedules();


	/**
	 * TAST 
	 */

	 $rootScope.task = {
	 	title:"",
	 	description:"",
	 	priority:"",
	 	assignedTo:"",
	 	category:"todo",
	 	createdBy:$rootScope.logedInUser._id
	 }

	 $rootScope.resetTask = function(){
	 	$rootScope.task.title = "";
	 	$rootScope.task.description = "";
	 	$rootScope.task.priority = "";
	 	$rootScope.task.assignedTo = "";
	 	$rootScope.task.category = "todo";
	 	$rootScope.task.createdBy = $rootScope.logedInUser._id;
	 }

	 $rootScope.getTasks = function(){
	 	$http.get('/getTasks')
	 	.success(function(data){
			if(data.success){
				$rootScope.allTasks = data.tasks;
				console.log($rootScope.allTasks);
			} else {
				console.log(data);
			}
		})
		.error(function(error){
			console.log(error);
		});
	 }

	$rootScope.saveTask = function(){
		$http.post('/saveTask', $rootScope.task)
		.success(function(data){
			if(data.success){
				$rootScope.resetTask();
				$rootScope.getTasks();
			} else {
				console.log(data);
			}
		})
		.error(function(error){
			console.log(error);
		});
	}

});