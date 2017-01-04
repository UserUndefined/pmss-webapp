function LoginController($scope, $timeout, AuthService, $location, toaster) {
  'ngInject';

  // ViewModel
  const vm = this;

  $scope.user = {
    username: '',
    password: ''
  };

  function initialize(){
    //Always logout if we end up here
    logout();
    $scope.currentPage.isLoginPage = true;
  }

  function logout(){
    AuthService.logout();
    $scope.userStatus.isAuthenticated = false;
  }

  function login(user) {
    AuthService.login(user.username, user.password, function(err){
      if(err){
        $timeout(function () {
          toaster.pop({type: 'error', title: 'Error', body: 'Invalid Logon', timeout: 3000});
        }, 0);
      } else {
        $location.path('/');
        $scope.currentPage.isLoginPage = false;
        $scope.userStatus.isAuthenticated = true;
        $scope.$apply();
      }
    });
  }

  initialize();

  vm.login = login;
  vm.logout = logout;
}

export default {
  name: 'LoginController',
  fn: LoginController
};
