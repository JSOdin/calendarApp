(function(window,angular){
    angular.module('calendarApp')
        .factory('currentMonth',[function(){
            var weeks, selectedDay;
            
            return {
                weeks: weeks,
                selectedDay: selectedDay
            }
        }])

})(window,window.angular);