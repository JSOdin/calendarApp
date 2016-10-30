(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',['calendarBuilder', 'calendarData', function(calendarBuilder,calendarData){
            return {
                restrict:'E',
                templateUrl: 'calendarInterface',
                link: function(scope){
                    var thisMonthReference = calendarData.currentMonth, startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());

                    initCalendar();
                    scope.incrementMonth = incrementMonth;

                    scope.decrementMonth = decrementMonth;
                    
                    scope.selectDayForEventsPage = selectDayForEventsPage;
                    
                    scope.filterEventsByType = filterEventsByType;

                    scope.isItSameDate = isItSameDate;

                    function initCalendar(){
                        var thisMonth = thisMonthReference.month();
                        if (!calendarData.weeks[thisMonth]){
                            calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
                        }
                        scope.weeks = calendarData.weeks[thisMonth];
                        scope.thisCalendarMonthDisplay = thisMonthReference.format("MMMM YYYY");
                    }

                    function incrementMonth(){
                        thisMonthReference.month(thisMonthReference.month()+1);
                        startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                        switchMonth(scope, startOfCalendarViewMoment, thisMonthReference);
                    }

                    function decrementMonth(){
                        thisMonthReference.month(thisMonthReference.month()-1);
                        startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());
                        switchMonth(scope, startOfCalendarViewMoment,thisMonthReference);
                    }

                    function selectDayForEventsPage(day){
                        if (calendarData.currentEventsDay) {
                            calendarData.currentEventsDay.selected = false;
                        }
                        calendarData.currentEventsDay = day;
                        day.selected = true;
                    }

                    function filterEventsByType(events,eventType){
                        return events.filter(function(eachEventObject){
                            return eachEventObject.type == eventType;
                        });
                    }

                    function isItSameDate(day,momentToCompare){
                        var dayMoment = day.moment;
                        momentToCompare = momentToCompare || moment();
                        return dayMoment.date() == momentToCompare.date() && dayMoment.month() == momentToCompare.month() && dayMoment.year() == momentToCompare.year();
                    }
                    
                    function switchMonth(scope, startOfCalendarViewMoment, thisMonthReference){
                        var nextMonth = calendarData.weeks[thisMonthReference.month()];
                        if (!nextMonth){
                            calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
                            nextMonth = calendarData.weeks[thisMonthReference.month()];
                        }
                        scope.weeks = nextMonth;
                        scope.thisCalendarMonthDisplay = thisMonthReference.format("MMMM YYYY");
                    }

                    function resetToFirstDayOnCalendar(moment){
                        return moment.date(1).day(0);
                    }
                }
            }
        }])
})(window,window.angular);