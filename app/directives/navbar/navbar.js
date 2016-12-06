'use strict';

angular.module('myApp')

    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/navbar/navbar.html',
            controller: 'NavbarController'
        }
    })

    .controller('NavbarController', ['$scope', 'authService', '$location', function ($scope, authService, $location) {
        $scope.signOut = function(){
            authService.logout(function(err){
                if (err){
                    //stay right here
                } else {
                    $location.path('/login');
                }
            });
        }
    }])
;