(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarData',[function(){
            var weeks={},
                currentEventsDay=null,
                currentMonth=moment(),
                selectTodayOnLaunch=true;
            
            return {
                weeks: weeks,
                currentMonth: currentMonth,
                currentEventsDay: currentEventsDay,             
                selectTodayOnLaunch: selectTodayOnLaunch
            }
        }])

})(window,window.angular);