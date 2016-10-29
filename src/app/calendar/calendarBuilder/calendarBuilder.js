(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarBuilder',['calendarData',function(calendarData){                 
            return {
                createWeeks:createWeeks
            }
            
            function createWeeks(startOfCalendarViewMoment, thisMonthReference){
                var hasFourWeeksAndPassedMonth, weeksCount = 0, weekStart = startOfCalendarViewMoment.clone(), currentMonth = weekStart.month(),
                    week, referenceMonth = thisMonthReference.month();

                calendarData.weeks[referenceMonth] = calendarData.weeks[referenceMonth] || [];
                while (!hasFourWeeksAndPassedMonth){
                    week= {days:createDays(weekStart.clone())};
                    calendarData.weeks[referenceMonth].push(week);
                    weeksCount++;
                    weekStart.add(1,'week');
                    hasFourWeeksAndPassedMonth = weeksCount > 3 && weekStart.month() != currentMonth;
                    currentMonth = weekStart.month();
                }
            }

            function createDays(firstDayOfWeek){
                var iterationNum, dayToInsert=firstDayOfWeek.clone().day(0), week=[],day;        
                for (iterationNum=0; iterationNum<7; iterationNum++){
                    day = {moment: dayToInsert, events: ['puppey','got','the','goods','hollah']};
                    week.push(day);
                    dayToInsert = dayToInsert.clone();
                    dayToInsert.add(1,'day');
                }
                return week;
            }
        }]);       
})(window,window.angular);