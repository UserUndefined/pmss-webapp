function NavDevelopmentsDirective() {

  return {
    restrict: 'E',
    templateUrl: 'directives/navDevelopments.html',
    scope: {},
    controller: 'NavDevelopmentsController as vm'
  }
}

export default {
  name: 'navDevelopments',
  fn: NavDevelopmentsDirective
};
