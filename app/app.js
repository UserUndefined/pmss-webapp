'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'dashboard',
    'developments',
    'login',
    'myApp.version',
    'angular-jwt'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
    //$locationProvider.html5Mode({enabled: true,requireBase: false});
    //$locationProvider.hashPrefix('!');
    //$routeProvider.otherwise({redirectTo: '/login'});
}])
    .run(['$rootScope', 'authService', '$location', function ($rootScope, authService, $location) {
        // Put the authService on $rootScope so its methods
        // can be accessed from the nav bar
        $rootScope.authService = authService;

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            var restrictedPage = $location.path() !== '/login';
            var loggedIn = authService.hasValidToken();
            if (restrictedPage && !loggedIn) {
                $location.path('/login');
            } else if (!restrictedPage && loggedIn){
                $location.path('/');
            }
        });
    }]);
