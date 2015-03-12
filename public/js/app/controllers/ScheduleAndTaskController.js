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
                    {addClass: 'btn btn-success btn-clean', text: 'Dismiss', onClick: function($noty) {
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
                    {addClass: 'btn btn-info btn-clean', text: 'Snooze', onClick: function($noty) {
                        $noty.close();
                        var t = 300000;
                        if(schedule.snoozetime)
                        {
                        	t = (schedule.snoozetime * 60000);
                        }
                        setTimeout(function(){notyConfirm(schedule);},t);
                        }
                    }
                ]
        });                                                    
    }  

	function checkSchedule(){
	  	for(var x = 0; x < $rootScope.schedules.length; x++){
	  		//console.log($rootScope.schedules[x].start, new Date($rootScope.schedules[x].start).getTime() , new Date().getTime())
	  		// if((new Date($rootScope.schedules[x].start).getTime() <= new Date().getTime()) && !$rootScope.schedules[x].is_ignored){
	  		// 	$rootScope.schedules[x].is_ignored = true;
	  		// 	notyConfirm($rootScope.schedules[x]);
	  		//}
	  		if ($rootScope.schedules[x].before_schedule == 'minutes')
	  		{
               	$rootScope.notification_min = new Date($rootScope.schedules[x].start).getTime() -  parseFloat($rootScope.schedules[x].before_time * 60 *1000);
               	var cTimeStamp = new Date().getTime();
              	if(cTimeStamp >= $rootScope.notification_min && !$rootScope.schedules[x].is_ignored){
              		$rootScope.schedules[x].is_ignored = true;
	  		 	 	notyConfirm($rootScope.schedules[x]);
	  		 	}
	  		}
	  		else if ($rootScope.schedules[x].before_schedule == 'hours'){
               $rootScope.notification_hour = new Date($rootScope.schedules[x].start).getTime() - parseFloat($rootScope.schedules[x].before_time * 60 *60 *1000);
                var cTimeStamp = new Date().getTime();
              if(cTimeStamp >= $rootScope.notification_hour && !$rootScope.schedules[x].is_ignored){
              	$rootScope.schedules[x].is_ignored = true;
	  		 	 notyConfirm($rootScope.schedules[x]);
	  		 	}
	  		}
	  	  else if ($rootScope.schedules[x].before_schedule == 'days'){
                $rootScope.notification_day = new Date($rootScope.schedules[x].start).getTime() - parseFloat($rootScope.schedules[x].before_time *24* 60 *60 *1000);
                 var cTimeStamp = new Date().getTime();
               if(cTimeStamp >= $rootScope.notification_day && !$rootScope.schedules[x].is_ignored){
              	$rootScope.schedules[x].is_ignored = true;
	  		  	 notyConfirm($rootScope.schedules[x]);
	  		  	}
	  		 }
	  	 else if ($rootScope.schedules[x].before_schedule == 'weeks'){
                $rootScope.notification_week =new Date($rootScope.schedules[x].start).getTime() - parseFloat($rootScope.schedules[x].before_time *7*24* 60 *60 *1000);
                var cTimeStamp = new Date().getTime();
               if(cTimeStamp >= $rootScope.notification_week && !$rootScope.schedules[x].is_ignored){
               	$rootScope.schedules[x].is_ignored = true;
	  		  	 notyConfirm($rootScope.schedules[x]);
	  		  	}
	  		 }
	  	}
	  	setTimeout(function(){checkSchedule();},30000);
	}

	$rootScope.getSchedules = function(){
		$http.get('/getSchedules')
        .success(function(data){
        	$rootScope.schedules = data.schedules;
        	checkSchedule();
        })
        .error(function(data){
            console.log(data);
        });
	}

	$rootScope.initSchedules = function(){
		// $http.get('/getSchedules')
  //       .success(function(data){
  //       	$rootScope.schedules = data.schedules;
  //       	checkSchedule();
  //           $('#calendar').fullCalendar({
  //               header: {
  //                 left: 'prev,next today',
  //                 center: 'title',
  //                 right: 'month,agendaWeek,agendaDay'
  //               },
  //               eventClick: function(event, element) {
                    
  //                   // $rootScope.newSchedule.title = event.title;
  //                   // $rootScope.newSchedule.start = event.start;
  //                   // $rootScope.newSchedule.end = event.end;
  //                   // $rootScope.newSchedule._id = event._id;

  //                   $rootScope.newSchedule = event;
                    
  //               	$rootScope.isEditSchedule = false;

  //                   $rootScope.$apply();
                    
  //                   $(".modal_calender_edit").click();
  //                   $('.modal-backdrop').css('background','none');
  //                   setTimeout(function(){
  //                       $('.modal-content').attr("style","border-radius:none;border-width:0px !important; box-shadow:0px 0px 3px #000000")
                    
  //                   },1);

  //               },
  //               defaultDate: new Date(),
  //               timezone : 'local',
  //               selectable: true,
  //               selectHelper: true,
  //               select: function(start, end) {

  //                   $(".modal_calender").click();
  //                   $('.modal-backdrop').css('background','none');
  //                   setTimeout(function(){
                    
  //                       $('.modal-content').attr("style","border-radius:none;border-width:0px !important; box-shadow:0px 0px 3px #000000")
  //                   },1);
  //                 //var title = prompt('Event Title:');
  //                 $rootScope.newSchedule.start = start;
  //                 $rootScope.newSchedule.end = end;
  //                 $rootScope.newSchedule.title = "";
  //                 $rootScope.newSchedule.is_ignored = false;
  //                 $rootScope.$apply();
  //                 $('#calendar').fullCalendar('unselect');
  //               },
  //               editable: true,
  //               eventLimit: true, // allow "more" link when too many events
  //               events: $rootScope.schedules
  //           });
  //       })
  //       .error(function(data){
  //           console.log(data);
  //       });

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
	}
	$rootScope.saveSchedule = function(){
		
		$http.post('/saveSchedule', {
						_id:$rootScope.newSchedule._id,
						end:$rootScope.newSchedule.end,
						start:$rootScope.newSchedule.start,
						title:$rootScope.newSchedule.title,
						before_time : $rootScope.newSchedule.before_time,
						before_schedule : $rootScope.newSchedule.before_schedule,
						snoozetime : $rootScope.newSchedule.snoozetime,
						is_ignored:false
					})
		.success(function(data){
			if(data.success){
        console.log($rootScope.newSchedule);
				if($rootScope.newSchedule._id){
					angular.forEach($rootScope.schedules, function(val, i){
						if(val._id == $rootScope.newSchedule._id){
							$rootScope.schedules[i].is_ignored = false;
							$rootScope.schedules[i].start = data.schedule.start;
              $rootScope.schedules[i].end = data.schedule.start;
						}
					});
          $rootScope.newSchedule.end = $rootScope.newSchedule.start;
					$('#calendar').fullCalendar('updateEvent', $rootScope.newSchedule);
          console.log("from update");
				}
				else {
					$rootScope.schedules.push(data.schedule);
					$('#calendar').fullCalendar('renderEvent', angular.copy(data.schedule), true);
          $rootScope.resetSchedule();
				}
				$('#calendar').fullCalendar('unselect');
        $rootScope.resetSchedule();
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
        $rootScope.resetSchedule();
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
  $rootScope.resetSchedule = function(){
    $rootScope.newSchedule = {};
  }

	$rootScope.getSchedules();


	/**
	 * TAST 
	 */

	 $rootScope.task = {
	 	description:"",
	 	createdBy:$rootScope.logedInUser._id
	 }

	 $rootScope.resetTask = function(){
	 	$rootScope.task.description = "";
	 	$rootScope.task.createdBy = $rootScope.logedInUser._id;
    $rootScope.editedTask = {};
	 }

	 $rootScope.getTasks = function(){
	 	$http.get('/getTasks')
	 	.success(function(data){
			if(data.success){
				$rootScope.allTasks = data.tasks;
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
				$rootScope.allTasks.unshift(data.task);
			} else {
				console.log(data);
			}
		})
		.error(function(error){
			console.log(error);
		});
	}

  $rootScope.editTask = function(task){
    $rootScope.editedTask = angular.copy(task);
  }

  $rootScope.updateTask = function(task, status){
    angular.forEach($rootScope.allTasks, function(val, i){
      if(val._id == task._id){
        task.status = status;
         $http.post('/saveTask', task)
         .success(function(data){
          $rootScope.resetTask();
          if(data.success){
            $rootScope.allTasks[i] = task;
            $(".close-task-popup").click();
          }
         })
         .error(function(error){
          console.log(error);
         })
      }
    });
  }

});