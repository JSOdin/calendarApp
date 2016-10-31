(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarBuilder',['calendarData',function(calendarData){                 
            return {
                createWeeks:createWeeks
            }
            
            function createWeeks(startOfCalendarViewMoment, thisMonthReference){
                var hasFourWeeksAndPassedMonth, weeksCount = 0, weekStart = startOfCalendarViewMoment.clone(), currentMonth = weekStart.month(),
                    week, thisMonthReferenceTimestamp = thisMonthReference.month() +''+ thisMonthReference.year();

                if (calendarData.weeks[thisMonthReferenceTimestamp]) return;
                calendarData.weeks[thisMonthReferenceTimestamp] = {weeks:[]};
                while (!hasFourWeeksAndPassedMonth){
                    week= {days:createDays(weekStart)};
                    calendarData.weeks[thisMonthReferenceTimestamp].weeks.push(week);
                    weeksCount++;
                    weekStart.add(1,'week');
                    hasFourWeeksAndPassedMonth = weeksCount > 3 && weekStart.month() != currentMonth;
                    /*hasGeneratedSixRows = weeksCount == 6; for fixed 6 rows */
                    currentMonth = weekStart.month();
                }
            }

            function createDays(firstDayOfWeek){
                var iterationNum, dayToInsert=firstDayOfWeek.clone(), week=[],day;
                for (iterationNum=0; iterationNum<7; iterationNum++){                 
                    day = {moment: dayToInsert, events: [], selected:false};
                    if (dayToInsert.date() == moment().date() && dayToInsert.month() == moment().month() && calendarData.selectTodayOnLaunch) {
                        day.selected = true
                        calendarData.selectTodayOnLaunch = false;
                        calendarData.currentEventsDay = day;
                    }
                    week.push(day);
                    dayToInsert = dayToInsert.clone();
                    dayToInsert.add(1,'day');
                }
                return week;
            }
        }]);       
})(window,window.angular);