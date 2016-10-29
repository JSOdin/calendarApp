(function(window,angular){
    angular.module('calendarApp')
        .directive('eventsInterface',['calendarData', function(calendarData){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/events/eventsInterface.html',
                link: function(scope){

                }
            }
        }])
})(window,window.angular);