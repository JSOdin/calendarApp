(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',['calendarBuilder', 'calendarData', function(calendarBuilder,calendarData){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/calendarInterface/calendarInterface.html',
                link: function(scope){
                    var thisMonthReference = calendarData.currentMonth, startOfCalendarViewMoment = resetToFirstDayOnCalendar(thisMonthReference.clone());

                    initCalendar();
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
                    
                    scope.selectDayForEventsPage = selectDayForEventsPage;
                    
                    scope.filterEventsByType = function(events,eventType){
                        return events.filter(function(eachEventObject){
                            return eachEventObject.type == eventType;
                        });
                    }

                    scope.isItSameDate = isItSameDate;
                    
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

                    function initCalendar(){
                        var thisMonth = thisMonthReference.month();
                        if (!calendarData.weeks[thisMonth]){
                            calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
                        }
                        scope.weeks = calendarData.weeks[thisMonth];
                        scope.thisCalendarMonthDisplay = thisMonthReference.format("MMMM YYYY");
                    }

                    function selectDayForEventsPage(day){
                        if (calendarData.currentEventsDay) {
                            calendarData.currentEventsDay.selected = false;
                        }
                        calendarData.currentEventsDay = day;
                        day.selected = true;
                    };

                    function isItSameDate(day,momentToCompare){
                        var dayMoment = day.moment;
                        momentToCompare = momentToCompare || moment();
                        return dayMoment.date() == momentToCompare.date() && dayMoment.month() == momentToCompare.month() && dayMoment.year() == momentToCompare.year();
                    }
                }
            }
        }])
})(window,window.angular);