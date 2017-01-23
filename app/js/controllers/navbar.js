function NavbarController($rootScope, $scope, $location, $mdSidenav, $mdUtil, AppSettings, SessionService) {
'ngInject';

  // ViewModel
  const vm = this;

  function initialise(){
    $scope.location = $location;
    vm.userRole = SessionService.userRole;
  }

  vm.signOut = function(){
    $rootScope.$broadcast(AppSettings.AUTH_EVENTS.logoutRequest);
  };

  vm.toggleLeft = buildToggler('left');
  vm.toggleRight = buildToggler('right');

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
