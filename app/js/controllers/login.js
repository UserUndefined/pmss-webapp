function LoginController(AuthService, $location) {
  'ngInject';

  // ViewModel
  const vm = this;

  function logout() {
    AuthService.logout();
    console.log('logged out');
  }

  function login() {
    console.log('calling authService.login');
    AuthService.login(function(err){
      if(err){
        //remain here
      } else {
        $location.path('/');
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
