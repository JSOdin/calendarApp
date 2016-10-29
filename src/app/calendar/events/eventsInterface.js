(function(window,angular){
    angular.module('calendarApp')
        .directive('eventsInterface',['calendarData', function(calendarData){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/events/eventsInterface.html',
                link: function(scope){
                    scope.today = calendarData.currentEventsDay;

                    scope.addEvent = addEvent;
                    
                    scope.removeEvent = removeEvent;

                    function addEvent(eventType, eventName){
                        if (!scope.eventName) return;
                        var event = {type:eventType, name: eventName};
                        scope.today.events.push(event);
                        scope.eventName = '';
                    }

                    function removeEvent(index){
                        scope.today.events.splice(index,1);
                    }
                }
            }
        }]);
})(window,window.angular);