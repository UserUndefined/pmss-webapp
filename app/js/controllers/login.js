function LoginController($scope, AuthService, $location) {
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
