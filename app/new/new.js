'use strict';

angular.module('new', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/newcitation', {
    templateUrl: 'new/new.html',
    controller: 'NewController'
  });
}])

.controller('NewController', ['$scope','$http', function($scope, $http) {

  function initialise(){
    $scope.newCitation = {};
    $scope.sectors = [];
    getSectors();
  }

  $scope.createNewCitation = function(){
    console.log('createNewCitation called');
    console.log(JSON.stringify($scope.newCitation));
  }

  function getSectors() {
    console.log('getSectors called');
    $http({
      method: 'GET',
      url: 'http://svdev02/citation/api/sectors'
    }).then(function successCallback(response) {
      console.log('api call worked!');
      $scope.sectors = response.data;
    }, function errorCallback(error) {
      console.error('api did not work! ' + JSON.stringify(error));
      $scope.sectors = [];
    });
  }

  initialise();

}]);