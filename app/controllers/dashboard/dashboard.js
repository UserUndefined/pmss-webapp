'use strict';

angular.module('dashboard', ['ngRoute'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {
            templateUrl: 'controllers/dashboard/dashboard.html',
            controller: 'DashboardController'
        });
    }])

    .controller('DashboardController', ['$scope', 'dbAccessService', function ($scope, dbAccessService) {
        $scope.nameList = [];


        function initialise() {
            dbAccessService.getNames(function(err, data){
                for(var i = 0; i < data.data.names.length; i++){
                    $scope.nameList.push(data.data.names[i].name);
                }
                $scope.$apply();
            });
            //dbAccessService.getNames(function(err, nameList){
            //    for(var i = 0; i < nameList.length; i++){
            //        $scope.nameList.push(nameList[i].name);
            //    }
            //});
        }

        initialise();
    }]);