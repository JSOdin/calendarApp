(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarBuilder',['calendarData',function(calendarData){                 
            return {
                createWeeks:createWeeks
            }
            
            function createWeeks(startOfCalendarViewMoment, thisMonthReference){
                var hasFourWeeksAndPassedMonth, weeksCount = 0, weekStart = startOfCalendarViewMoment.clone(), currentMonth = weekStart.month(),
                    week, referenceMonth = thisMonthReference.month(), referenceYear = thisMonthReference.year();

                if (calendarData.weeks[referenceMonth+''+referenceYear]) return;
                calendarData.weeks[referenceMonth+''+referenceYear] = {weeks:[]};
                while (!hasFourWeeksAndPassedMonth){
                    week= {days:createDays(weekStart)};
                    calendarData.weeks[referenceMonth+''+referenceYear].weeks.push(week);
                    weeksCount++;
                    weekStart.add(1,'week');
                    hasFourWeeksAndPassedMonth = weeksCount > 3 && weekStart.month() != currentMonth;
                    /*hasGeneratedSixRows = weeksCount == 6;*/
                    currentMonth = weekStart.month();
                }
            }

            function createDays(firstDayOfWeek){
                var iterationNum, dayToInsert=firstDayOfWeek.clone(), week=[],day;
                for (iterationNum=0; iterationNum<7; iterationNum++){                 
                    day = {moment: dayToInsert, events: []};
                    week.push(day);
                    dayToInsert = dayToInsert.clone();
                    dayToInsert.add(1,'day');
                }
                return week;
            }
        }]);       
})(window,window.angular);