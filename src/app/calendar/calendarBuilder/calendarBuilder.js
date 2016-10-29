(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarBuilder',[function(){                 
            return {
                createWeeks:createWeeks
            }
            
            function createWeeks(scope,startOfCalendarViewMoment){
                var hasFourWeeksAndPassedMonth, weeksCount = 0, weekStart = startOfCalendarViewMoment.clone(), currentMonth = weekStart.month();
                while (!hasFourWeeksAndPassedMonth){
                    var week = {
                        days : createDays(weekStart.clone())
                    }
                    scope.weeks.push(week);
                    weeksCount++;
                    weekStart.add(1,'week');
                    hasFourWeeksAndPassedMonth = weeksCount > 3 && weekStart.month() != currentMonth;
                    currentMonth = weekStart.month();
                }
            }

            function createDays(firstDayOfWeek){
                var iterationNum, dayToInsert=firstDayOfWeek.clone().day(0), week=[],day;        
                for (iterationNum=0; iterationNum<7; iterationNum++){
                    day = {moment: dayToInsert, events: []};
                    week.push(dayToInsert);
                    dayToInsert = dayToInsert.clone();
                    dayToInsert.add(1,'day');
                }
                return week;
            }
        }]);       
})(window,window.angular);