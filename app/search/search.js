'use strict';

angular.module('search', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/search', {
    templateUrl: 'search/search.html',
    controller: 'SearchController'
  });
}])

.controller('SearchController', ['$scope', '$http', function($scope, $http) {

  $scope.citations = [];
  $scope.searchBusinessName = '';

  $scope.getCitations = function() {
    console.log('getCitations called');
    $http({
      method: 'GET',
      url: 'http://svdev02/citation/api/search?name=' + $scope.searchBusinessName
    }).then(function successCallback(response) {
        console.log('api call worked!');
        console.log(response.data.length + ' citations found');
      $scope.citations = response.data;
    }, function errorCallback(error) {
      console.error('api did not work! ' + JSON.stringify(error));
      $scope.citations = [];
    });
  }

}]);