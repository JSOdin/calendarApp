(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',['calendarBuilder', 'calendarData', function(calendarBuilder,calendarData){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/calendarInterface/calendarInterface.html',
                link: function(scope){
                    var thisMonthReference = calendarData.currentMonth, startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                    calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
                    scope.weeks = calendarData.weeks[thisMonthReference.month()];
                    scope.incrementMonth = function(){
                        thisMonthReference.month(thisMonthReference.month()+1);
                        startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                        switchMonth(scope, startOfCalendarViewMoment, thisMonthReference);
                    }

                    scope.decrementMonth = function(){
                        thisMonthReference.month(thisMonthReference.month()-1);
                        startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                        switchMonth(scope, startOfCalendarViewMoment,thisMonthReference);
                    }
                    
                    function switchMonth(scope, startOfCalendarViewMoment, thisMonthReference){
                        var nextMonth = calendarData.weeks[thisMonthReference.month()];
                        if (!nextMonth){
                            calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
                            return scope.weeks = calendarData.weeks[thisMonthReference.month()];
                        }
                        scope.weeks = nextMonth;
                    }

                    function resetToFirstDayOnCalendar(moment){
                        return moment.date(1).day(0);
                    }
                }
            }            
            
            
        }])
})(window,window.angular);