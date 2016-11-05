(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarState',[function(){
           var currentEventsDay = null,
               currentMonth = moment(),
               selectTodayOnLaunch = true;

           return {
               currentEventsDay:currentEventsDay,
               currentMonth:currentMonth,
               selectTodayOnLaunch:selectTodayOnLaunch
           }
        }])
})(window,window.angular)