(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarBuilder',['calendarData','calendarState',function(calendarData,calendarState){

            return {
                createWeeks:createWeeks
            }
            
            function createWeeks(startOfCalendarViewMoment, thisMonthReference){
                var hasFourOrMoreWeeksAndPassedMonth, weeksCount = 0, weekStart = startOfCalendarViewMoment.clone(), currentMonth = weekStart.month(),
                    week, thisMonthReferenceTimestamp = thisMonthReference.month() +''+ thisMonthReference.year();
                calendarData.months[thisMonthReferenceTimestamp] = {weeks:[]};
                
                while (!hasFourOrMoreWeeksAndPassedMonth){
                    week = {days:createDays(weekStart)};
                    calendarData.months[thisMonthReferenceTimestamp].weeks.push(week);
                    weeksCount++;
                    weekStart.add(1,'week');    // now weekstart represents next week.
                    hasFourOrMoreWeeksAndPassedMonth = weeksCount > 3 && weekStart.month() != currentMonth; 
                    /*hasGeneratedSixRows = weeksCount == 6; for fixed 6 rows */
                    // currentMonth : tracks where we are in our weeks building. weekStart is used directly to build out weeks
                    currentMonth = weekStart.month();                  
                }
            }

            function createDays(firstDayOfWeek){
                var iterationNum, dayToInsert=firstDayOfWeek.clone(), week=[],day, today=resetToMidnight(moment());
                for (iterationNum=0; iterationNum<7; iterationNum++){                 
                    day = {moment: dayToInsert, events: [], selected:false};
                    if (day.moment.isSame(today) && calendarState.selectTodayOnLaunch) {
                        day.selected = true
                        calendarState.selectTodayOnLaunch = false;
                        calendarState.currentEventsDay = day;
                    }
                    week.push(day);
                    dayToInsert = dayToInsert.clone();
                    dayToInsert.add(1,'day');
                }
                return week;
            }

            function resetToMidnight(moment){
                return moment.millisecond(0).second(0).minute(0).hour(0);
            }
        }]);       
})(window,window.angular);