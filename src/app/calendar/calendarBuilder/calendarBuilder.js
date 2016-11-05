(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarBuilder',['calendarData',function(calendarData){

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
                    hasFourOrMoreWeeksAndPassedMonth = weeksCount > 3 && weekStart.month() != currentMonth; // currentMonth : tracks where we are in our weeks building. weekStart is used directly to build out weeks
                    /*hasGeneratedSixRows = weeksCount == 6; for fixed 6 rows */
                    currentMonth = weekStart.month();
                }
            }

            function createDays(firstDayOfWeek){
                var iterationNum, dayToInsert=firstDayOfWeek.clone(), week=[],day, today=resetToMidnight(moment());
                for (iterationNum=0; iterationNum<7; iterationNum++){                 
                    day = {moment: dayToInsert, events: [], selected:false};
                    if (day.moment.isSame(today) && calendarData.selectTodayOnLaunch) {
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

            function resetToMidnight(moment){
                return moment.millisecond(0).second(0).minute(0).hour(0);
            }
        }]);       
})(window,window.angular);