function NavbarDirective() {

  return {
    restrict: 'EA',
    templateUrl: 'directives/navbar.html',
    scope: {
      title: '@',
      message: '@clickMessage'
    },
    link: (scope, element) => {
      element.on('click', () => {
        window.alert('Element clicked: ' + scope.message);
      });
    }
  };
}

export default {
  name: 'navbar',
  fn: NavbarDirective
};
