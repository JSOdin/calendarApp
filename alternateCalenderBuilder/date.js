//flat-array data structure implementation of calendar builder.

var dates = [];
var start = new Date(), monthReference = new Date();
var monthsCache = {};
monthReference.setDate(1);

// set start to first day of calendar
start.setDate(1);   // first day of month
start.setDate(start.getDate()-start.getDay());  // negative numbers count back into previous month (Nov 1 is 1, Oct 31 is 0, Oct 30 is -1)

function buildMonth(start, monthReference, direction){
    var startofCalendar = new Date(start);
    var referenceMonth = monthReference.getMonth(),
        referenceMonthTimeStamp = referenceMonth + '' +monthReference.getFullYear();
    var nextDay,
        month=[];
    var nextDayIsDifferentMonthAndCurrentDayIsSunday;

    if (monthsCache[referenceMonthTimeStamp]){
        // find index of first calendar day and get how manyever days are indicated in cache by slice
        for (var i=0; i<dates.length;i++){
            if (dates[i].getDate() == startofCalendar.getDate() && dates[i].getMonth() == startofCalendar.getMonth() && dates[i].getFullYear() == startofCalendar.getFullYear()){
                return dates.slice(i, i+monthsCache[referenceMonthTimeStamp].numOfDays);
            }
        }
    }

    while (!nextDayIsDifferentMonthAndCurrentDayIsSunday){
        month.push(new Date(startofCalendar));
        nextDay = new Date(startofCalendar);
        nextDay.setDate(startofCalendar.getDate()+1);
        nextDayIsDifferentMonthAndCurrentDayIsSunday = nextDay.getMonth() != referenceMonth && startofCalendar.getDay() == 6;
        startofCalendar.setDate(startofCalendar.getDate()+1);
    }

    monthsCache[referenceMonthTimeStamp] = {numOfDays: month.length};

    adjustNewMonths(dates, month, direction);

    if (direction == 'forward'){
        dates = dates.concat(month);
        return dates.slice(dates.length-month.length,dates.length);
    } else {
        dates = month.concat(dates);
        return dates.slice(0, month.length);
    }
}

function adjustNewMonths(bigDatesArray, month, direction){
    var duplicateFound,firstDayOfWeekToCheckAgainst;
    if (!(bigDatesArray || []).length){
        return;
    }

    if (direction == 'forward'){
        firstDayOfWeekToCheckAgainst = bigDatesArray.slice(bigDatesArray.length-7 ,bigDatesArray.length)[0];
        duplicateFound = firstDayOfWeekToCheckAgainst.getDate() == month[0].getDate()
                        && firstDayOfWeekToCheckAgainst.getMonth() == month[0].getMonth()
                        && firstDayOfWeekToCheckAgainst.getFullYear() == month[0].getFullYear()

        if (duplicateFound) bigDatesArray.splice(bigDatesArray.length-7,7);
    } else {
        firstDayOfWeekToCheckAgainst = bigDatesArray.slice(0,7)[0];
        var firstDayOfLastWeekOfGeneratedMonth = month.slice(month.length-7, month.length)[0];
        duplicateFound = firstDayOfWeekToCheckAgainst.getDate() == firstDayOfLastWeekOfGeneratedMonth.getDate()
                        && firstDayOfWeekToCheckAgainst.getMonth() == firstDayOfLastWeekOfGeneratedMonth.getMonth()
                        && firstDayOfWeekToCheckAgainst.getFullYear() == firstDayOfLastWeekOfGeneratedMonth.getFullYear()

        if (duplicateFound) bigDatesArray.splice(0,7);
    }
}

//build 1st month (nov)
buildMonth(start,monthReference, 'forward')

monthReference.setMonth(monthReference.getMonth()+1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//build second month (dec)
buildMonth(start,monthReference, 'forward')

monthReference.setMonth(monthReference.getMonth()+1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//build third month (jan)
buildMonth(start,monthReference, 'forward')

monthReference.setMonth(monthReference.getMonth()-1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//go back one month (dec)
buildMonth(start,monthReference, 'backward')

monthReference.setMonth(monthReference.getMonth()-1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//go back one month (nov)
buildMonth(start,monthReference, 'backward')

monthReference.setMonth(monthReference.getMonth()-1);
start = new Date(monthReference);
start.setDate(1);
start.setDate(start.getDate()-start.getDay());

//go back one month (oct)
console.log(buildMonth(start,monthReference,'backward'));

