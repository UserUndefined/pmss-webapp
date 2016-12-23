function NavbarController($location) {
'ngInject';

  // ViewModel
  const vm = this;

  vm.signOut = function(){
    $location.path('/login');
  };

}

export default {
  name: 'NavbarController',
  fn: NavbarController
};
