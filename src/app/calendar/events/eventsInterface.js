(function(window,angular){
    angular.module('calendarApp')
        .directive('eventsInterface',['calendarData', 'weatherForecast',function(calendarData, weatherForecast){
            return {
                restrict:'E',
                templateUrl: './src/app/calendar/events/eventsInterface.html',
                link: function(scope){
                    scope.today = calendarData.currentEventsDay;

                    scope.addEvent = addEvent;
                    
                    scope.removeEvent = removeEvent;

                    initForecast(scope);

                    function addEvent(eventType, eventName){
                        if (!scope.eventName) return;
                        var event = {type:eventType, name: eventName};
                        scope.today.events.push(event);
                        scope.eventName = '';
                    }

                    function removeEvent(index){
                        scope.today.events.splice(index,1);
                    }

                    function initForecast(scope){
                        if (weatherForecast.checkTimeStamp()){
                            return weatherForecast.fetchWeatherForecast(function(response){
                                weatherForecast.setForecastCache(response.data.query.results.channel.item.forecast);
                                scope.forecast = checkForecastAvailability(weatherForecast.getForecastCache(),scope.today);
                            });
                        }
                        scope.forecast = checkForecastAvailability(weatherForecast.getForecastCache(),scope.today);
                    }

                    function checkForecastAvailability(cache, today){
                        var forecastMoment, dateParts;
                        return cache.filter(function(eachForecast){
                            dateParts = eachForecast.date.split(' ');
                            forecastMoment = moment().month(dateParts[1]).date(dateParts[0]).year(dateParts[2]);
                            return forecastMoment.month() == today.moment.month() && forecastMoment.date() == today.moment.date() && forecastMoment.year() == today.moment.year();
                        })
                    }
                }
            }
        }]);
})(window,window.angular);