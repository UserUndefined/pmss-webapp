function NavbarController($location, $mdSidenav, $mdUtil) {
'ngInject';

  // ViewModel
  const vm = this;

  vm.signOut = function(){
    $location.path('/login');
  };

  vm.toggleLeft = buildToggler('left');
  vm.toggleRight = buildToggler('right');
/*
  function buildToggler(navID) {
    return function() {
      $mdSidenav(navID).toggle();
    }
  }
*/
  function buildToggler(navID) {
    var debounceFn = $mdUtil.debounce(function () {
      $mdSidenav(navID)
        .toggle()
    }, 100);
    return debounceFn;
  }

}

export default {
  name: 'NavbarController',
  fn: NavbarController
};
