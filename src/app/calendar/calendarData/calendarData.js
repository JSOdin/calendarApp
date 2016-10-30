(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarData',[function(){
            var weeks={},
                currentEventsDay=null,
                currentMonth=moment(),
                selectedDay=null;
            
            return {
                weeks: weeks,
                currentMonth: currentMonth,
                currentEventsDay: currentEventsDay,
                selectedDay: selectedDay
            }
        }])

})(window,window.angular);