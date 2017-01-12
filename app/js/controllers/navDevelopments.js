function NavDevelopmentsController($rootScope, AppSettings) {
'ngInject';

  // ViewModel
  const vm = this;

  vm.filterButton = function(){
    $rootScope.$broadcast(AppSettings.APP_EVENTS.completeDevelopmentFilter);
  };

}

export default {
  name: 'NavDevelopmentsController',
  fn: NavDevelopmentsController
};
