(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',['calendarBuilder', 'calendarData', function(calendarBuilder,calendarData){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/calendarInterface/calendarInterface.html',
                link: function(scope){
                    scope.weeks= calendarData.weeks;
                    var thisMonthReference = calendarData.currentMonth, startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                    calendarBuilder.createWeeks(scope, startOfCalendarViewMoment);

                    scope.incrementMonth = function(){
                        thisMonthReference.month(thisMonthReference.month()+1);
                        startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                        switchMonth(scope, startOfCalendarViewMoment);
                    }

                    scope.decrementMonth = function(){
                        thisMonthReference.month(thisMonthReference.month()-1);
                        startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                        switchMonth(scope, startOfCalendarViewMoment);
                    }
                    
                    function switchMonth(scope, startOfCalendarViewMoment){
                        scope.weeks.length = 0;
                        calendarBuilder.createWeeks(scope, startOfCalendarViewMoment);
                    }

                    function resetToFirstDayOnCalendar(moment){
                        return moment.date(1).day(0);
                    }
                }
            }            
            
            
        }])
})(window,window.angular);