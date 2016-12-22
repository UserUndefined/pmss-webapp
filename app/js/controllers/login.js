function LoginController($scope, $rootScope, AuthService, $location, AppSettings) {
  'ngInject';

  // ViewModel
  const vm = this;

  $scope.user = {
    username: '',
    password: ''
  };

  function logout() {
    AuthService.logout();
  }

  function login(user) {
    AuthService.login(user.username, user.password, function(err){
      if(err){
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginFailed);
      } else {
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginSuccess);
        $location.path('/');
        $scope.$apply();
      }
    });
  }

  vm.login = login;
  vm.logout = logout;
}

export default {
  name: 'LoginController',
  fn: LoginController
};
