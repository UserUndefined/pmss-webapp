'use strict';

angular.module('dashboard', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/dashboard', {
    templateUrl: 'dashboard/dashboard.html',
    controller: 'DashboardController'
  });
}])

.controller('DashboardController', ['$scope', function($scope) {

}]);