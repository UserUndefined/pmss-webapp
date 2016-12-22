function LoginController($scope, AuthService, $location) {
  'ngInject';

  // ViewModel
  const vm = this;

  function logout() {
    AuthService.logout();
    console.log('logged out');
  }

  function login() {
    console.log('calling authService.login');
    AuthService.login($scope.user.username, $scope.user.password, function(err){
      if(err){
        //remain here
      } else {
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
