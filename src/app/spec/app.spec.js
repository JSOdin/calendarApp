describe('calendarApp',function(){
    var calendarApp;
    beforeEach(angular.mock.module('calendarApp'));

    beforeEach(function(){
        calendarApp = angular.module('calendarApp');
    })

   it("should load the root app",function(){   
       expect(calendarApp).toBeDefined();
   })
});