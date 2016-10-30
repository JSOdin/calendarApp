(function(window,angular){
    angular.module('calendarApp',['ui.router']).config(['$stateProvider','$urlRouterProvider','$compileProvider','$logProvider',function($stateProvider,$urlRouterProvider,$compileProvider,$logProvider){
            $logProvider.debugEnabled(false);
            $compileProvider.debugInfoEnabled(false);

            $stateProvider.state('calendar',{
                url:'/',
                templateUrl:'calendar'
            });

            $stateProvider.state('events',{
                url:'/events/:month/:day',
                templateUrl:'eventsManager'
            });

            $urlRouterProvider.otherwise('/');
        }]);      
})(window,window.angular);