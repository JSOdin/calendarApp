(function(window,angular){
    angular.module('calendarApp',['ui.router']).config(['$stateProvider','$urlRouterProvider','$compileProvider','$logProvider',function($stateProvider,$urlRouterProvider,$compileProvider,$logProvider){
            $logProvider.debugEnabled(false);
            $compileProvider.debugInfoEnabled(false);

            $stateProvider.state('calendar',{
                url:'/',
                templateUrl:'./src/app/calendar/calendar.html'
            })

            $stateProvider.state('events',{
                url:'/events/:month/:day',
                templateUrl:'./src/app/calendar/events/eventsManager.html'
            });

            $urlRouterProvider.otherwise('/');
        }]);      
})(window,window.angular);