'use strict';

angular.module('login', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/login', {
            templateUrl: 'controllers/login/login.html',
            controller: 'LoginController'
        });
    }])

    .controller('LoginController', ['$scope', 'authService', '$location', function ($scope, authService, $location) {

        function logout() {
            authService.logout();
            console.log('logged out');
        }

        $scope.login = function () {
            console.log('calling authService.login');
            authService.login(function(err){
                if(err){
                    //remain here
                } else {
                    $location.path('/');
                }
            });
        };

        //logout();
    }]);