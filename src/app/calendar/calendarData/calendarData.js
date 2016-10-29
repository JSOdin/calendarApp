(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarData',[function(){
            var weeks=[], selectedDay, currentMonth=moment();
            
            return {
                weeks: weeks,
                selectedDay: selectedDay,
                currentMonth: currentMonth
            }
        }])

})(window,window.angular);