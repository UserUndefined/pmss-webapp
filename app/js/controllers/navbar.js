function NavbarController($rootScope, $scope, $location, $mdSidenav, $mdUtil, AppSettings) {
'ngInject';

  // ViewModel
  const vm = this;

  function initialise(){
    $scope.location = $location;
  }

  vm.signOut = function(){
    $rootScope.$broadcast(AppSettings.AUTH_EVENTS.logoutRequest);
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

  initialise();

}

export default {
  name: 'NavbarController',
  fn: NavbarController
};
