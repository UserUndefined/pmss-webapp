'use strict';

angular.module('dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'controllers/dashboard/dashboard.html',
            controller: 'DashboardController'
        });
    }])

    .controller('DashboardController', ['$scope', 'authService', function ($scope, authService) {
    }]);