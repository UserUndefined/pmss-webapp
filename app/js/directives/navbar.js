function NavbarDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/navbar.html',
    scope: {
      title: '@',
      message: '@clickMessage'
    }
  }
}

export default {
  name: 'navbar',
  fn: NavbarDirective
};
