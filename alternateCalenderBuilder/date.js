var dates = [];
var start = new Date(), monthReference = new Date();
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

function buildMonth(start, monthReference){
    var startofCalendar = new Date(start);
    var referenceMonth = monthReference.getMonth();
    var nextDay;

    duplicateCheckerAndSetNewStartWeekIfDuplicate(dates, startofCalendar);
    var nextDayIsDifferentMonthAndCurrentDayIsSunday;
    while (!nextDayIsDifferentMonthAndCurrentDayIsSunday){
        dates.push(new Date(startofCalendar));
        nextDay = new Date(startofCalendar);
        nextDay.setDate(startofCalendar.getDate()+1);
        nextDayIsDifferentMonthAndCurrentDayIsSunday = nextDay.getMonth() != referenceMonth && startofCalendar.getDay() == 6;
        startofCalendar.setDate(startofCalendar.getDate()+1);
    }
    return dates;
}

function duplicateCheckerAndSetNewStartWeekIfDuplicate(bigDatesArray,startOfCalendar){
    if (!(bigDatesArray || []).length){
        return;
    }

    var FirstDayOfWeekToCheckAgainst = bigDatesArray.slice(bigDatesArray.length-7,bigDatesArray.length)[0]

   var duplicateFound = FirstDayOfWeekToCheckAgainst.getDate() == startOfCalendar.getDate()
                       && FirstDayOfWeekToCheckAgainst.getMonth() == startOfCalendar.getMonth()
                       && FirstDayOfWeekToCheckAgainst.getFullYear() == startOfCalendar.getFullYear();

    if (duplicateFound){
        startOfCalendar.setDate(startOfCalendar.getDate()+7);
    }
}

//build 1st month
buildMonth(start,monthReference)

monthReference.setMonth(monthReference.getMonth()+1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//build second month
buildMonth(start,monthReference)

monthReference.setMonth(monthReference.getMonth()+1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//build third month
console.log(buildMonth(start,monthReference));

