(function(window,angular){
    angular.module('calendarApp')
        .directive('calendar',[function(){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/calendarInterface/calendarInterface.html',
                link: function(scope){

                }
            }
        }])
})(window,window.angular);