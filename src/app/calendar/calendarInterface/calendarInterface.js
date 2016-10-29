(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',['calendarBuilder',function(calendarBuilder){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/calendarInterface/calendarInterface.html',
                link: function(scope){
                    var thisMonthReference = moment();
                    scope.weeks=[];
                    var startOfCalendarViewMoment = thisMonthReference.clone().date(1);
                    startOfCalendarViewMoment.day(0);
                    calendarBuilder.createWeeks(scope, startOfCalendarViewMoment, thisMonthReference);
                }
            }            
            
            
        }])
})(window,window.angular);