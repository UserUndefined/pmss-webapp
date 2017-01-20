function ApplicationController($rootScope, $scope, AppSettings, AuthService, $timeout) {
  'ngInject';

  function initialise(){
    $scope.userRoles = AppSettings.USER_ROLES;
    AuthService.checkUserSession(function(err){
      $scope.userStatus = {isAuthenticated: !err};
    });
  }

  var showLoginDialog = function() {
    $scope.userStatus = {isAuthenticated: false};
    $timeout(function () {
      $scope.$apply();
    });
  };

  var signOut = function(){
    AuthService.logout();
  };

  var setCurrentUser = function () {
    $scope.userStatus = {isAuthenticated: true};
    $timeout(function () {
      $scope.$apply();
    });
  };

  var showNotAuthorized = function(){
    alert('Not Authorized');
  };

  $rootScope.$on(AppSettings.AUTH_EVENTS.notAuthorized, showNotAuthorized);
  $rootScope.$on(AppSettings.AUTH_EVENTS.notAuthenticated, showLoginDialog);
  $rootScope.$on(AppSettings.AUTH_EVENTS.sessionTimeout, showLoginDialog);
  $rootScope.$on(AppSettings.AUTH_EVENTS.logoutSuccess, showLoginDialog);
  $rootScope.$on(AppSettings.AUTH_EVENTS.loginSuccess, setCurrentUser);
  $rootScope.$on(AppSettings.AUTH_EVENTS.logoutRequest, signOut);

  initialise();

}

export default {
  name: 'ApplicationController',
  fn: ApplicationController
};
