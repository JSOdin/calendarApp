(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',['calendarBuilder', 'calendarData', '$state', function(calendarBuilder,calendarData, $state){
            return {
                restrict:'E',
                templateUrl: 'calendarInterface',
                link: function(scope){
                    var thisMonthReference = calendarData.currentMonth, startOfCalendarViewMoment = resetToMidnight(resetToFirstDayOnCalendar(thisMonthReference.clone()));

                    initCalendar(scope, startOfCalendarViewMoment, thisMonthReference);
                    scope.incrementMonth = incrementMonth;

                    scope.decrementMonth = decrementMonth;
                    
                    scope.selectDayForEventsPage = selectDayForEventsPage;
                    
                    scope.filterEventsByType = filterEventsByType;

                    scope.isItSameDate = isItSameDate;
                    
                    scope.checkIfDayIsNotCurrentMonth = checkIfDayIsNotCurrentMonth;

                    scope.goToEvents =goToEvents;

                    function initCalendar(scope, startOfCalendarViewMoment, thisMonthReference){
                        var thisMonthReferenceTimestamp = thisMonthReference.month()+''+thisMonthReference.year();
                        if (!calendarData.months[thisMonthReferenceTimestamp]){
                            calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
                        }
                        scope.weeks = calendarData.months[thisMonthReferenceTimestamp].weeks;
                        scope.thisCalendarMonthDisplay = thisMonthReference.format("MMMM YYYY");
                    }

                    function incrementMonth(){
                        thisMonthReference.month(thisMonthReference.month()+1);
                        startOfCalendarViewMoment = resetToMidnight(resetToFirstDayOnCalendar(thisMonthReference.clone()));
                        initCalendar(scope, startOfCalendarViewMoment, thisMonthReference);
                    }

                    function decrementMonth(){
                        thisMonthReference.month(thisMonthReference.month()-1);
                        startOfCalendarViewMoment = resetToMidnight(resetToFirstDayOnCalendar(thisMonthReference.clone()));
                        initCalendar(scope, startOfCalendarViewMoment,thisMonthReference);
                    }

                    function selectDayForEventsPage(day){
                        if (calendarData.currentEventsDay && thisMonthReference.month() == day.moment.month()) {
                            calendarData.currentEventsDay.selected = false;
                        }

                        if (thisMonthReference.month() == day.moment.month()){
                            calendarData.currentEventsDay = day;
                            day.selected = true;
                        }
                    }

                    function filterEventsByType(events,eventType){
                        return events.filter(function(eachEventObject){
                            return eachEventObject.type == eventType;
                        });
                    }

                    function isItSameDate(day,momentToCompare){
                        momentToCompare = momentToCompare || moment();
                        return day.moment.isSame(resetToMidnight(momentToCompare));
                    }

                    function resetToFirstDayOnCalendar(moment){
                        return moment.date(1).day(0);
                    }

                    function resetToMidnight(moment){
                        return moment.millisecond(0).second(0).minute(0).hour(0);
                    }
                    
                    function checkIfDayIsNotCurrentMonth(day){                       
                        return day.moment.month() != thisMonthReference.month();
                    }

                    function goToEvents(day){
                        return thisMonthReference.month() != day.moment.month() ? false : $state.go('events',{day: day.moment.date(), month: day.moment.month()+1});
                    }
                }
            }
        }])
})(window,window.angular);