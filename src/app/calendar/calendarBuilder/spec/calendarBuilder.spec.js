describe('calendarBuilder methods',function(){
    var calendarBuilder, calendarData, thisMonthReference, thisMonthReferenceTimestamp, generatedWeeksOfMonth, weeksArray, daysArray, startOfCalendarViewMoment;

    beforeEach(angular.mock.module('calendarApp'));

    beforeEach(inject(function(_calendarBuilder_, _calendarData_){
        calendarBuilder = _calendarBuilder_;
        calendarData = _calendarData_;
    }));

    beforeEach(function(){
        startOfCalendarViewMoment = moment().date(1).day(0);
        thisMonthReference = moment();
        thisMonthReferenceTimestamp = thisMonthReference.month()+''+thisMonthReference.year();
        calendarBuilder.createWeeks(startOfCalendarViewMoment, thisMonthReference);
        generatedWeeksOfMonth = calendarData.months[thisMonthReferenceTimestamp];
    });

    describe('createWeeks',function(){
        describe('should build the weeks arrays using the createWeeks factory method',function(){
            it('generated weeks\' first day in days array of first week should equal calendar\'s first day',function(){
                expect(generatedWeeksOfMonth.weeks[0].days[0].moment.date()).toEqual(startOfCalendarViewMoment.date())
            })

            it('generated weeks\' last day in days array of last week should equal calendar\'s last day',function(){
                weeksArray = generatedWeeksOfMonth.weeks;
                daysArray = weeksArray[weeksArray.length-1].days;
                expect(daysArray[daysArray.length-1].moment.date()).toEqual(startOfCalendarViewMoment.day(6).endOf('month').day(6).date());
                startOfCalendarViewMoment.date(1).day(0);
            })
        })
    });
});