function ApplicationController($scope, AppSettings, AuthService) {
  'ngInject';

  function initialise(){
    AuthService.setCurrentUser();
    $scope.currentUser = null;
    $scope.userRoles = AppSettings.USER_ROLES;
    $scope.isAuthorized = AuthService.isAuthorized(AppSettings.USER_ROLES.all);
    $scope.userStatus = {isAuthenticated: AuthService.isAuthenticated()};
    $scope.currentPage = {isLoginPage: true};
  }

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

  initialise();

}

export default {
  name: 'ApplicationController',
  fn: ApplicationController
};
