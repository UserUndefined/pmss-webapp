function ApplicationController($scope, AppSettings, AuthService) {
  'ngInject';

  // ViewModel
  //const vm = this;

  $scope.currentUser = null;
  $scope.userRoles = AppSettings.USER_ROLES;
  $scope.isAuthorized = AuthService.isAuthorized;

  $scope.setCurrentUser = function (user) {
    $scope.currentUser = user;
  };

}

export default {
  name: 'ApplicationController',
  fn: ApplicationController
};
