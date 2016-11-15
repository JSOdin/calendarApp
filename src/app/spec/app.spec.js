describe('calendarApp',function(){
    var calendarApp,
        calendarData;
    beforeEach(function(){
        calendarApp = angular.mock.module('calendarApp');
    });

    beforeEach(inject(function(_calendarData_){
        calendarData = _calendarData_;
    }))

   it("should load the root app",function(){   
       expect(calendarData).toBeDefined();
   })
});