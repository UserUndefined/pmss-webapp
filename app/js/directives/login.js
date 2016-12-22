function loginDialog(AppSettings) {
'ngInject';

  return {
    restrict: 'A',
    template: '<div ng-if="visible" ng-include="\'login-form.html\'">',
    link: function (scope) {
      var showDialog = function () {
        scope.visible = true;
      };

      scope.visible = false;
      scope.$on(AppSettings.AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AppSettings.AUTH_EVENTS.sessionTimeout, showDialog)
    }
  }
}

export default {
  name: 'loginDialog',
  fn: loginDialog
};
