function OnRun($rootScope, AppSettings, AuthService) {
  'ngInject';

  // change page title based on state
  $rootScope.$on('$stateChangeSuccess', (event, toState) => {
    $rootScope.pageTitle = '';

    if (toState.title) {
      $rootScope.pageTitle += toState.title;
      $rootScope.pageTitle += ' \u2014 ';
    }

    $rootScope.pageTitle += AppSettings.appTitle;
  });

  $rootScope.$on('$stateChangeStart', function (event, next) {
    var authorizedRoles = next.data.authorizedRoles;
    AuthService.checkUserSession(function(err){
      if(err) {
        event.preventDefault();
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.notAuthenticated);
      } else if (!AuthService.isAuthorized(authorizedRoles)) {
        event.preventDefault();
        $rootScope.$broadcast(AppSettings.AUTH_EVENTS.notAuthorized);
      }
    });
  });
}

export default OnRun;
