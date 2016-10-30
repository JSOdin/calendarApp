(function(window,angular){
    angular.module('calendarApp')
        .factory('weatherForecast',['$http', function($http){
            var yahooWeatherAPI = 'https://query.yahooapis.com/v1/public/yql?q=SELECT * FROM weather.forecast WHERE woeid="9807"&format=json&diagnostics=true';
            var forecastCache = {};

            return {
                fetchWeatherForecast: fetchWeatherForecast,
                checkTimeStamp: checkTimeStamp,
                getForecastCache: getForecastCache,
                setForecastCache : setForecastCache
            };

            function fetchWeatherForecast(callback, errorCallback){ 
                forecastCache.timeStamp = moment();
                return $http.get(yahooWeatherAPI).then(callback, errorCallback);               
            }

            function checkTimeStamp(){
                return !forecastCache.timeStamp || forecastCache.timeStamp.diff(moment(),'days') > 5;
            }
            
            function getForecastCache (){
                return forecastCache.forecast;
            }
            
            function setForecastCache(forecast){
                forecastCache.forecast = forecast;
            }
        }])
})(window,window.angular);
