function NavbarDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/navbar.html',
    scope: {
      title: '@',
      message: '@clickMessage'
    },
    controller: 'NavbarController as vm'
  }
}

export default {
  name: 'navbar',
  fn: NavbarDirective
};
