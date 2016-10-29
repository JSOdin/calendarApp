(function(window,angular){
    angular.module('calendarApp',['ui.router']).config(['$stateProvider','$urlRouterProvider','$compileProvider','$logProvider',function($stateProvider,$urlRouterProvider,$compileProvider,$logProvider){
            $logProvider.debugEnabled(false);
            $compileProvider.debugInfoEnabled(false);

            $stateProvider.state('events',{
                url:'/events/:day',
                templateUrl:'./src/app/events/eventsManager.html'
            })
        }]);      
})(window,window.angular);