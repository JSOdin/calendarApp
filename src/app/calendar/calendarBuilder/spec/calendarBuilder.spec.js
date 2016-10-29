describe('calendarBuilder methods',function(){
    var calendarBuilder, scope = {}, startOfCalendarView;

    beforeEach(angular.mock.module('calendarApp'));

    beforeEach(inject(function(_calendarBuilder_){
        calendarBuilder = _calendarBuilder_;
    }));

    beforeEach(function(){
        scope.weeks = [];
        startOfCalendarView = moment().date(1).day(0);
    });

    describe('createDays',function(){
        it("should build a list of the days of the week", function (){
            var iterationNum, dayToInsert= moment("10-28-2016", "MM-DD-YYYY").day(0), week=[];
            for (iterationNum=0; iterationNum<7; iterationNum++){
                week.push(dayToInsert);
                dayToInsert = dayToInsert.clone();
                dayToInsert.add(1,'day');
            }

            expect(week[0].date()).toEqual(23);

            expect(week[6].date()).toEqual(29);
        })
    });

    describe('createWeeks',function(){
        it('should build the weeks array using the factory method',function(){
            calendarBuilder.createWeeks(scope, startOfCalendarView)
            expect(scope.weeks[0].days[0].date()).toEqual(startOfCalendarView.date());
            expect(scope.weeks[scope.weeks.length-1].days[6].date()).toEqual(startOfCalendarView.day(6).add(1,'month').subtract(1,'day').day(6).date());
        })
    })
})