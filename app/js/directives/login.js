function loginDialog(AuthService) {
'ngInject';

  return {
    restrict: 'A',
    template: '<div ng-if="visible" ng-include="\'login.html\'">',
    link: function (scope) {

      scope.vm = this;

      scope.vm.login = function(user) {
        AuthService.login(user.username, user.password, function(){});
      };

      scope.visible = true;
    }
  }
}

export default {
  name: 'loginDialog',
  fn: loginDialog
};
