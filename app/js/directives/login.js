function loginDialog($rootScope, AppSettings, AuthService) {
'ngInject';

  return {
    restrict: 'A',
    template: '<div ng-if="visible" ng-include="\'login.html\'">',
    link: function (scope) {

      scope.vm = this;

      var showDialog = function () {
        scope.visible = true;
      };

      var hideDialog = function () {
        scope.visible = false;
      };

      scope.vm.login = function(user) {
        AuthService.login(user.username, user.password, function(err){
          if(err){
            $rootScope.$broadcast(AppSettings.AUTH_EVENTS.loginFailed);
          } else {
            scope.currentPage.isLoginPage = false;
            scope.userStatus.isAuthenticated = true;
            scope.$apply();
          }
        });
      };

      scope.visible = false;
      scope.$on(AppSettings.AUTH_EVENTS.notAuthenticated, showDialog);
      scope.$on(AppSettings.AUTH_EVENTS.sessionTimeout, showDialog);
      scope.$on(AppSettings.AUTH_EVENTS.loginSuccess, hideDialog);
    }
  }
}

export default {
  name: 'loginDialog',
  fn: loginDialog
};
