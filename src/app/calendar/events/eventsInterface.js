(function(window,angular){
    angular.module('calendarApp')
        .directive('eventsInterface',['calendarData', function(calendarData){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/events/eventsInterface.html',
                link: function(scope){
                },
                controller: eventsController
            }
        }]);
    
        eventsController.$inject=['$scope','$stateParams', 'calendarData'];

        function eventsController($scope, $stateParams, calendarData){
            $scope.events = calendarData.currentEventsDay.events;
        }

})(window,window.angular);