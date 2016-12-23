function LoginController($scope, AuthService, $location) {
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
        //ToDo: display toast
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
