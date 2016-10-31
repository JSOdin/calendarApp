(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarData',[function(){
            var months={},
                currentEventsDay=null,
                currentMonth=moment(),
                selectTodayOnLaunch=true;
            
            return {
                months: months,
                currentMonth: currentMonth,
                currentEventsDay: currentEventsDay,             
                selectTodayOnLaunch: selectTodayOnLaunch
            }
        }])

})(window,window.angular);