function ApplicationController($scope, AppSettings, AuthService) {
  'ngInject';

  $scope.currentUser = null;
  $scope.userRoles = AppSettings.USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized(AppSettings.USER_ROLES.all);
  $scope.userStatus = {isAuthenticated: AuthService.isAuthenticated()};
  $scope.currentPage = {isLoginPage: true};

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

}

export default {
  name: 'ApplicationController',
  fn: ApplicationController
};
