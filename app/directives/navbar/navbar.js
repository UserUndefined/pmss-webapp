'use strict';

angular.module('navbar', [])

    .directive('navbar', function () {
        return {
            restrict: 'E',
            templateUrl: 'directives/navbar/navbar.html',
            controller: 'NavbarController'
        }
    })

    .controller('NavbarController', ['$scope', '$location', 'authService', function ($scope, $location, authService) {
        $scope.signOut = function(){
            authService.logout(function(err){
                if (err){
                    //stay right here
                } else {
                    $location.path('/login');
                }
            });
        };
    }])
;