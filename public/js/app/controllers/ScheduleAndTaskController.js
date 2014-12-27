angular.module('myApp.ScheduleAndTaskController', [])
.controller('ScheduleAndTaskController', function( $rootScope, $scope, $window, $location,$http) {

	console.log("schedule");

	$rootScope.newSchedule = {};
	$rootScope.isEditSchedule = false;
	$rootScope.editedScheduleEvent = {};

	$rootScope.getSchedules = function(){
		$http.get('/getSchedules')
        .success(function(data){
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
                  $rootScope.$apply();
                  $('#calendar').fullCalendar('unselect');
                },
                editable: true,
                eventLimit: true, // allow "more" link when too many events
                events: data.schedules
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
						title:$rootScope.newSchedule.title
					})
		.success(function(data){
			if(data.success){
				if($rootScope.newSchedule._id){
					$('#calendar').fullCalendar('updateEvent', $rootScope.newSchedule);
				}
				else {
					$('#calendar').fullCalendar('renderEvent', data.schedule, true);
				}
				$('#calendar').fullCalendar('unselect');
				console.log("from here");
			} else {
				alert("Please try again");
			}
		})	
		.error(function(data){
			console.log(data);
		});
	}

	$rootScope.deleteSchedule = function(){
		$http.post('/deleteSchedule', $rootScope.newSchedule)
		.success(function(data){
			if(data.success){
				console.log($rootScope.editedScheduleEvent);
				$('#calendar').fullCalendar( 'removeEvents', $rootScope.newSchedule);
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

});