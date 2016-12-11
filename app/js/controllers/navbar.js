function NavbarController(AuthService, $location) {
'ngInject';

  // ViewModel
  const vm = this;

  vm.signOut = function(){
    AuthService.logout();
    $location.path('/login');
  };

}

export default {
  name: 'NavbarController',
  fn: NavbarController
};
