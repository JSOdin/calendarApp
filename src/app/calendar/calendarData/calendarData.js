(function(window,angular){
    angular.module('calendarApp')
        .factory('calendarData',[function(){
            var weeks={},                
                currentMonth=moment();
            
            return {
                weeks: weeks,
                currentMonth: currentMonth
            }
        }])

})(window,window.angular);