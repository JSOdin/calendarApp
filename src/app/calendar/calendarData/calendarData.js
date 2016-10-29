(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarData',[function(){
            var weeks={},
                currentEventsDay=null,
                currentMonth=moment();
            
            return {
                weeks: weeks,
                currentMonth: currentMonth,
                currentEventsDay: currentEventsDay
            }
        }])

})(window,window.angular);